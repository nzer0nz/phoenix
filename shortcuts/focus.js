/* IMPORT */

/* LAUNCHERS */

const launchChrome = `
  tell application "Google Chrome"
    make new window
    activate
  end tell
`;

function launchDevTools() {
  const chrome = Space.active()
    .windows()
    .find(window => /Google Chrome/.test(window.app().name()));

  if (!chrome) return alert("Chrome is not opened");

  osascript(`
    tell application "Google Chrome" to activate
    tell application "System Events" to tell process "Google Chrome"
      click menu item "Developer Tools" of menu 1 of menu item "Developer" of menu 1 of menu bar item "View" of menu bar 1
    end tell
  `);
}

const launchVSC = () => Task.run("/usr/local/bin/code", ["-n"]);

// const launchVSC =  `
// tell application "Visual Studio Code"
//   activate
// end tell
// `;

const launchLine = `
tell application "Line"
  activate
end tell
`;

const launchiTerm = `
  if application "iTerm" is running then
    tell application "iTerm"
      activate
      if not (exists current window) then
        create window with default profile
      end if
    end tell
  else
    tell application "iTerm"
      create window with default profile
    end tell
  end if
`;

const launchJetbrainsIntelliJ = `
  tell application "IntelliJ IDEA"
    activate
  end tell
`;

const launchFinder = `
set targetFolder to POSIX file "/Users/nonthawatduangchai/Desktop"
  tell application "Finder"
    open targetFolder 
    activate
  end tell
`;

/* CALLBACKS */

function callbackJetbrainsIntelliJ(isNewWindow) {
  if (!isNewWindow) return;

  setTimeout(() => {
    const focused = Window.focused();

    if (!focused) return;

    magicJetbrainsIntelliJOpen(focused);
  }, 600);
}

function callbackLine(isNewWindow) {
  if (!isNewWindow) return;

  setTimeout(() => {
    const focused = Window.focused();

    if (!focused) return;

    magicLineOpen(focused);
  }, 1200);
}

function callbackiTerm(isNewWindow) {
  if (!isNewWindow) return;

  setTimeout(() => {
    const focused = Window.focused();

    if (!focused) return;

    magiciTermOpen(focused);
  }, 600);
}

/* FOCUS */

const focus = [
  ["`", HYPER, ["Google Chrome Not Dev"]],["c",HYPER,["Google Chrome",false,/^(?!Developer Tools)/,/Picture in Picture/,launchChrome]],
  ["d", HYPER, ["Google Chrome",true,/(Developer Tools)|(chrome-devtools)/,/Picture in Picture/,launchDevTools]],
  ["v", HYPER, ["Code", false, false, false, launchVSC]],
  ["j", HYPER, ["Jetbraind Intellij",false,false,false,launchJetbrainsIntelliJ, callbackJetbrainsIntelliJ]],
  ["l", HYPER, ["Line", false, false, false, launchLine, callbackLine]],
  ["t", HYPER, ["iTerm", false, false, false, launchiTerm, callbackiTerm]],
  ["f", HYPER, ["Finder", false, false, false, launchFinder]],
  ["g", HYPER, ["Tower"]]
  ];

setKeysHandler(focusWindow, focus);
