use std::collections::HashMap;
use std::io::{BufRead, BufReader, Read, Write};
use std::os::unix::net::UnixStream;
use std::process::Command;
use std::sync::atomic::{AtomicBool, AtomicU32, Ordering};
use std::sync::{Arc, Mutex};
use tauri::ipc::Channel;

/// Runs `omarchy theme set` off the main thread. A sync command would run on
/// the GTK main loop and freeze the webview for as long as the script takes.
#[tauri::command]
async fn set_theme(name: String) -> Result<(), String> {
    let output = tauri::async_runtime::spawn_blocking(move || {
        Command::new("omarchy").args(["theme", "set", &name]).output()
    })
    .await
    .map_err(|e| format!("failed to join set_theme task: {e}"))?
    .map_err(|e| format!("failed to run omarchy: {e}"))?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).into_owned());
    }

    Ok(())
}

/// `omarchy-shell <args…>`, the Omarchy shell's IPC. Only this binary: the
/// TypeScript side (@stef/omarchy's OmarchyShell) decides what to call.
#[tauri::command]
async fn omarchy_shell(args: Vec<String>) -> Result<String, String> {
    let output = tauri::async_runtime::spawn_blocking(move || {
        Command::new("omarchy-shell").args(&args).output()
    })
    .await
    .map_err(|e| format!("failed to join omarchy_shell task: {e}"))?
    .map_err(|e| format!("failed to run omarchy-shell: {e}"))?;

    let mut text = String::from_utf8_lossy(&output.stdout).into_owned();
    text.push_str(&String::from_utf8_lossy(&output.stderr));
    if !output.status.success() {
        return Err(text);
    }
    Ok(text)
}

fn hypr_socket(name: &str) -> Result<String, String> {
    let runtime = std::env::var("XDG_RUNTIME_DIR").map_err(|_| "XDG_RUNTIME_DIR is unset")?;
    let instance = std::env::var("HYPRLAND_INSTANCE_SIGNATURE")
        .map_err(|_| "not inside Hyprland: HYPRLAND_INSTANCE_SIGNATURE is unset")?;
    Ok(format!("{runtime}/hypr/{instance}/{name}"))
}

/// One request on Hyprland's command socket, as `hyprctl` sends it
/// (e.g. `j/clients`). Decoding happens in TypeScript (@stef/hyprland).
#[tauri::command]
async fn hypr_request(command: String) -> Result<String, String> {
    tauri::async_runtime::spawn_blocking(move || {
        let mut stream = UnixStream::connect(hypr_socket(".socket.sock")?)
            .map_err(|e| format!("connect: {e}"))?;
        stream.write_all(command.as_bytes()).map_err(|e| format!("write: {e}"))?;
        stream
            .shutdown(std::net::Shutdown::Write)
            .map_err(|e| format!("shutdown: {e}"))?;
        let mut reply = String::new();
        stream.read_to_string(&mut reply).map_err(|e| format!("read: {e}"))?;
        Ok(reply)
    })
    .await
    .map_err(|e| format!("failed to join hypr_request task: {e}"))?
}

#[derive(Default)]
struct EventSubscriptions {
    next: AtomicU32,
    stops: Mutex<HashMap<u32, Arc<AtomicBool>>>,
}

/// Streams socket2's event lines into `channel` until `hypr_events_stop`.
/// Returns the subscription id.
#[tauri::command]
fn hypr_events(
    channel: Channel<String>,
    subscriptions: tauri::State<'_, EventSubscriptions>,
) -> Result<u32, String> {
    let stream = UnixStream::connect(hypr_socket(".socket2.sock")?)
        .map_err(|e| format!("connect: {e}"))?;
    let id = subscriptions.next.fetch_add(1, Ordering::Relaxed);
    let stop = Arc::new(AtomicBool::new(false));
    subscriptions.stops.lock().unwrap().insert(id, stop.clone());
    // Wake up regularly to notice a stop even when Hyprland is quiet.
    stream
        .set_read_timeout(Some(std::time::Duration::from_millis(500)))
        .map_err(|e| format!("timeout: {e}"))?;
    std::thread::spawn(move || {
        let mut reader = BufReader::new(stream);
        let mut line = String::new();
        while !stop.load(Ordering::Relaxed) {
            line.clear();
            match reader.read_line(&mut line) {
                Ok(0) => break,
                Ok(_) => {
                    if channel.send(line.trim_end().to_string()).is_err() {
                        break;
                    }
                }
                Err(e)
                    if e.kind() == std::io::ErrorKind::WouldBlock
                        || e.kind() == std::io::ErrorKind::TimedOut => {}
                Err(_) => break,
            }
        }
    });
    Ok(id)
}

#[tauri::command]
fn hypr_events_stop(id: u32, subscriptions: tauri::State<'_, EventSubscriptions>) {
    if let Some(stop) = subscriptions.stops.lock().unwrap().remove(&id) {
        stop.store(true, Ordering::Relaxed);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .manage(EventSubscriptions::default())
        .invoke_handler(tauri::generate_handler![
            set_theme,
            omarchy_shell,
            hypr_request,
            hypr_events,
            hypr_events_stop
        ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
