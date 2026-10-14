pragma ComponentBehavior: Bound

import QtQuick
import Quickshell
import qs.Commons
import "lib/view.mjs" as View

// The lock screen's view, driven by Omarchy's untouched Service.qml: the same
// properties and signals as the stock LockView (upstream/LockView.qml), and
// its behaviour (password sync, focus, wake, clearing a failure on typing),
// drawn as Material 3 instead. Which M3 component each part is:
// interpretation lock.components.
Item {
  id: root

  property string backgroundPath: ""
  property int backgroundVersion: 0
  property bool fingerprintConfigured: false
  property bool authenticatingPassword: false
  property string failureMessage: ""
  property int failedAttempts: 0
  property bool inputEnabled: true
  property bool loadBackground: true
  property string passwordText: ""
  property bool syncingPasswordText: false

  signal submitPassword(string password)
  signal passwordTextEdited(string password)
  signal clearFailureRequested()
  signal wakeRequested()

  // Shape, spacing and type, live from ~/.config/omarchy/stef/tokens.json; type
  // follows the Omarchy text size.
  Tokens {
    id: tokens
    textBase: Style.fontBaseSize // qmllint disable missing-property
  }
  // The theme's M3 colour roles (omaterial.json), or an approximation from
  // Omarchy's colours under other themes.
  Scheme {
    id: scheme
    omarchy: ({ background: Color.background, foreground: Color.foreground, accent: Color.accent, muted: Color.muted, urgent: Color.urgent }) // qmllint disable missing-property
  }
  readonly property var m3: tokens.m3
  function compColor(name) { return scheme.color[root.m3.comp[name].role] }
  function comp(name) { return root.m3.comp[name] }
  function typeOf(style) { return root.m3.type[style] }

  readonly property string userName: Quickshell.env("USER") || Quickshell.env("LOGNAME") || ""
  readonly property string faceUrl: "file://" + Quickshell.env("HOME") + "/.face"
  readonly property bool errorState: failureMessage.length > 0
  readonly property bool canSubmit: View.canSubmit({ inputEnabled: root.inputEnabled, passwordLength: passwordInput.text.length, authenticating: root.authenticatingPassword }) // qmllint disable missing-property
  // Clock, date and name sit on the scrimmed wallpaper, not on a surface: white,
  // as Android's lock screen draws them (interpretation lock.components).
  readonly property color onWallpaper: "#ffffff"
  // The field's measurements: 56dp high (M3 text field specs); 320 wide holds
  // a long password's dots before they shrink.
  readonly property int fieldHeight: 56
  readonly property int fieldWidth: 320
  readonly property int avatarSize: 96
  readonly property int dotFontSize: root.typeOf("body-large").size + 4
  readonly property int dotLetterSpacing: 4
  readonly property real dotScale: dotMetrics.advanceWidth > 0
    ? Math.min(1, (passwordInput.width - 4) / dotMetrics.advanceWidth)
    : 1

  // Cache-busts the lock background by appending `?v=`, as stock does, so a
  // background picked mid-session reloads.
  function fileUrl(path) {
    if (!path) return ""
    var encoded = String(path).split("/").map(encodeURIComponent).join("/")
    return "file://" + encoded + "?v=" + root.backgroundVersion
  }

  function forcePasswordFocus() { passwordInput.forceActiveFocus() }

  function syncPasswordText() {
    if (passwordInput.text === root.passwordText) return
    root.syncingPasswordText = true
    passwordInput.text = root.passwordText
    root.syncingPasswordText = false
  }

  function submit() {
    var submitted = root.passwordText
    root.passwordTextEdited("")
    if (submitted.length > 0) root.submitPassword(submitted)
  }

  onPasswordTextChanged: root.syncPasswordText()
  onInputEnabledChanged: if (root.inputEnabled) Qt.callLater(root.forcePasswordFocus)
  Component.onCompleted: {
    root.syncPasswordText()
    if (root.inputEnabled) Qt.callLater(root.forcePasswordFocus)
  }

  // The masked password at full size; dotScale shrinks the dots once they
  // outgrow the field, so every keystroke stays visible.
  TextMetrics {
    id: dotMetrics
    font.family: Style.font.family // qmllint disable missing-property
    font.pixelSize: root.dotFontSize
    font.letterSpacing: root.dotLetterSpacing
    text: "●".repeat(passwordInput.text.length)
  }

  property date now: new Date()
  Timer {
    interval: 1000
    running: true
    repeat: true
    onTriggered: root.now = new Date()
  }

  Rectangle {
    anchors.fill: parent
    color: scheme.color["surface"] // qmllint disable missing-property

    // The wallpaper, sharp, under the M3 scrim.
    Image {
      anchors.fill: parent
      source: root.loadBackground ? root.fileUrl(root.backgroundPath) : ""
      fillMode: Image.PreserveAspectCrop
      asynchronous: true
      cache: false
      sourceSize.width: width
      sourceSize.height: height
    }
    Rectangle {
      anchors.fill: parent
      color: scheme.color["scrim"] // qmllint disable missing-property
      opacity: root.m3.scrimOpacity
    }

    MouseArea {
      anchors.fill: parent
      hoverEnabled: true
      onClicked: { root.wakeRequested(); root.forcePasswordFocus() }
      onPositionChanged: root.wakeRequested()
    }

    Column {
      anchors.centerIn: parent
      spacing: 0

      Text {
        anchors.horizontalCenter: parent.horizontalCenter
        textFormat: Text.PlainText
        text: Qt.formatTime(root.now, Qt.locale().timeFormat(Locale.ShortFormat))
        color: root.onWallpaper
        font.family: Style.font.family // qmllint disable missing-property
        font.pixelSize: root.typeOf("display-large").size
        font.weight: root.typeOf("display-large").weight
        font.letterSpacing: root.typeOf("display-large").tracking
      }
      Text {
        anchors.horizontalCenter: parent.horizontalCenter
        textFormat: Text.PlainText
        text: Qt.formatDate(root.now, "dddd d MMMM")
        color: root.onWallpaper
        font.family: Style.font.family // qmllint disable missing-property
        font.pixelSize: root.typeOf("title-medium").size
        font.weight: root.typeOf("title-medium").weight
        font.letterSpacing: root.typeOf("title-medium").tracking
      }

      Item { width: 1; height: root.m3.space["space600"] }

      // The avatar: ~/.face when there is one, else a monogram (a list item's
      // leading avatar: primary-container with on-primary-container).
      Rectangle {
        anchors.horizontalCenter: parent.horizontalCenter
        width: root.avatarSize
        height: root.avatarSize
        radius: width / 2
        color: scheme.color["primary-container"] // qmllint disable missing-property

        Text {
          anchors.centerIn: parent
          visible: face.status !== Image.Ready
          textFormat: Text.PlainText
          text: View.initialOf(root.userName) // qmllint disable missing-property
          color: scheme.color["on-primary-container"] // qmllint disable missing-property
          font.family: Style.font.family // qmllint disable missing-property
          font.pixelSize: root.typeOf("headline-medium").size
          font.weight: root.typeOf("headline-medium").weight
        }
        RoundedClip {
          anchors.fill: parent
          radius: width / 2
          visible: face.status === Image.Ready

          Image {
            id: face
            anchors.fill: parent
            source: root.faceUrl
            fillMode: Image.PreserveAspectCrop
            asynchronous: true
            sourceSize.width: width
            sourceSize.height: height
          }
        }
      }

      Item { width: 1; height: root.m3.space["space200"] }

      Text {
        anchors.horizontalCenter: parent.horizontalCenter
        textFormat: Text.PlainText
        text: root.userName
        color: root.onWallpaper
        font.family: Style.font.family // qmllint disable missing-property
        font.pixelSize: root.typeOf("title-large").size
        font.weight: root.typeOf("title-large").weight
      }

      Item { width: 1; height: root.m3.space["space300"] }

      // The password: an M3 filled text field, always focused.
      Item {
        id: field
        anchors.horizontalCenter: parent.horizontalCenter
        width: root.fieldWidth
        height: root.fieldHeight

        // Container: only the top corners round (md.comp.filled-text-field.container.shape, extra-small top).
        Rectangle {
          anchors.fill: parent
          color: root.compColor("md.comp.filled-text-field.container.color")
          topLeftRadius: root.m3.corner["extra-small"] ?? 4
          topRightRadius: root.m3.corner["extra-small"] ?? 4
        }

        TextInput {
          id: passwordInput
          anchors.fill: parent
          anchors.leftMargin: 16 + submitButton.width
          anchors.rightMargin: 16 + submitButton.width
          verticalAlignment: TextInput.AlignVCenter
          horizontalAlignment: TextInput.AlignHCenter
          activeFocusOnPress: true
          clip: true
          enabled: root.inputEnabled && !root.authenticatingPassword
          readOnly: root.authenticatingPassword
          echoMode: TextInput.Password
          passwordCharacter: "●"
          passwordMaskDelay: 0
          color: root.compColor("md.comp.filled-text-field.input-text.color")
          selectionColor: Qt.alpha(scheme.color["primary"], 0.4) // qmllint disable missing-property
          selectedTextColor: root.compColor("md.comp.filled-text-field.input-text.color")
          font.family: Style.font.family // qmllint disable missing-property
          font.pixelSize: Math.max(1, Math.floor(root.dotFontSize * root.dotScale))
          font.letterSpacing: root.dotLetterSpacing * root.dotScale
          cursorVisible: activeFocus && root.inputEnabled && !root.authenticatingPassword && !root.errorState && text.length > 0
          cursorDelegate: Rectangle {
            width: 2
            color: root.errorState ? root.compColor("md.comp.filled-text-field.error.focus.caret.color") : root.compColor("md.comp.filled-text-field.caret.color")
            visible: passwordInput.cursorVisible
          }

          onTextChanged: {
            if (!root.syncingPasswordText) root.passwordTextEdited(text)
            if (text.length > 0) root.wakeRequested()
            if (text.length > 0 && root.errorState) root.clearFailureRequested()
          }
          onAccepted: root.submit()

          Keys.onPressed: function(event) {
            root.wakeRequested()
            if (event.key === Qt.Key_Escape || (event.modifiers & Qt.ControlModifier && event.key === Qt.Key_U)) {
              root.passwordTextEdited("")
              event.accepted = true
            }
          }
        }

        // Placeholder, in the input's place while it is empty.
        Text {
          anchors.fill: passwordInput
          visible: passwordInput.text.length === 0
          textFormat: Text.PlainText
          text: "Password"
          color: root.compColor("md.comp.filled-text-field.input-text.placeholder.color")
          font.family: Style.font.family // qmllint disable missing-property
          font.pixelSize: root.typeOf("body-large").size
          font.letterSpacing: root.typeOf("body-large").tracking
          horizontalAlignment: Text.AlignHCenter
          verticalAlignment: Text.AlignVCenter
          elide: Text.ElideRight
        }

        // Leading slot: the fingerprint hint when a sensor is enrolled (a
        // text field's leading icon), balancing the trailing submit button.
        Text {
          anchors.left: parent.left
          anchors.leftMargin: 12
          anchors.verticalCenter: parent.verticalCenter
          width: submitButton.width
          visible: root.fingerprintConfigured
          textFormat: Text.PlainText
          text: "󰈷"
          color: root.compColor("md.comp.filled-text-field.trailing-icon.color")
          font.family: Style.font.family // qmllint disable missing-property
          font.pixelSize: root.comp("md.comp.filled-text-field.trailing-icon.size")
          horizontalAlignment: Text.AlignHCenter
          verticalAlignment: Text.AlignVCenter
        }

        // Trailing slot: submit, a standard icon button.
        Item {
          id: submitButton
          anchors.right: parent.right
          anchors.rightMargin: 4
          anchors.verticalCenter: parent.verticalCenter
          width: root.comp("md.comp.icon-button.small.container.height")
          height: width

          Rectangle {
            anchors.fill: parent
            radius: width / 2
            color: root.compColor("md.comp.icon-button.standard.hovered.state-layer.color")
            opacity: !root.canSubmit ? 0
              : submitMouse.pressed ? root.comp("md.comp.icon-button.standard.pressed.state-layer.opacity")
              : submitMouse.containsMouse ? root.comp("md.comp.icon-button.standard.hovered.state-layer.opacity")
              : 0
          }
          Text {
            anchors.centerIn: parent
            textFormat: Text.PlainText
            text: "󰁔"
            color: root.canSubmit ? root.compColor("md.comp.icon-button.standard.icon.color") : root.compColor("md.comp.icon-button.standard.disabled.icon.color")
            opacity: root.canSubmit ? 1 : root.comp("md.comp.icon-button.standard.disabled.icon.opacity")
            font.family: Style.font.family // qmllint disable missing-property
            font.pixelSize: root.comp("md.comp.icon-button.small.icon.size")
          }
          MouseArea {
            id: submitMouse
            anchors.fill: parent
            hoverEnabled: true
            enabled: root.canSubmit
            cursorShape: Qt.PointingHandCursor
            onClicked: { root.submit(); root.forcePasswordFocus() }
          }
        }

        // Active indicator: the field is always focused, so 2dp primary; error
        // turns it error.
        Rectangle {
          anchors.left: parent.left
          anchors.right: parent.right
          anchors.bottom: parent.bottom
          height: root.comp("md.comp.filled-text-field.focus.active-indicator.height")
          color: root.errorState
            ? root.compColor("md.comp.filled-text-field.error.focus.active-indicator.color")
            : root.compColor("md.comp.filled-text-field.focus.active-indicator.color")
        }
      }

      // Supporting text: the failure, or the check in progress. It keeps its
      // line so the field doesn't move.
      Text {
        width: root.fieldWidth
        anchors.horizontalCenter: parent.horizontalCenter
        topPadding: 4
        leftPadding: 16
        rightPadding: 16
        textFormat: Text.PlainText
        text: root.authenticatingPassword ? "Checking…" : root.failureMessage
        color: root.errorState && !root.authenticatingPassword
          ? root.compColor("md.comp.filled-text-field.error.supporting-text.color")
          : root.onWallpaper
        font.family: Style.font.family // qmllint disable missing-property
        font.pixelSize: root.typeOf("body-small").size
        font.letterSpacing: root.typeOf("body-small").tracking
        elide: Text.ElideRight
        height: root.typeOf("body-small").lineHeight + topPadding
      }
    }
  }
}
