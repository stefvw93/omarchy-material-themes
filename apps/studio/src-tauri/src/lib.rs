use std::process::Command;

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![set_theme])
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
