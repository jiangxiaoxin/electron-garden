const {
  app,
  BrowserWindow,
  Tray,
  Menu
} = require('electron')

const path = require("path")

app.setName("MenuBarApp")

let mainWindow = null
let appIcon = null

const debug = /--debug/.test(process.argv[2])
console.log(`debug: ${debug}`)

const locked = app.requestSingleInstanceLock()
if (!locked) {
  app.quit();
} else {
  app.on("ready", readyHandler)
  app.on("activate", activateHandler)
  app.on("window-all-closed", allClosedHandler)
  app.on("second-instance", secondInstanceHandler)
  app.on("before-quit", beforeQuitHandler)
}

function beforeQuitHandler() {
  if (appIcon && appIcon.isDestroyed() === false) {
    appIcon.destory();
    appIcon = null
  }
}

function secondInstanceHandler(event, commandLine, workingDirectory) {
  console.log("second-instance");
  toggleMainWindow();
}


function readyHandler(e) {
  console.log("app ready");
  createMainWindow();
  createAppIcon()
}


/**
 * 给mac准备的，mac关掉窗口之后，程序还是存活的，点击dock之后如果没有窗口了就重新建立窗口
 */
function activateHandler(e) {
  console.log("app activate");
  if (!mainWindow) {
    createWindow()
  }
}

function allClosedHandler(e) {
  console.log("app all windows closed");
}

/**
 * 切换mainwindow的显示。
 */
function toggleMainWindow() {
  if (!mainWindow) {
    return
  }

  if (mainWindow.isVisible()) {
    mainWindow.hide()
    return
  }

  placeMainWindow()
  if (mainWindow.isMinimized()) {
    mainWindow.restore()
  }
  if (mainWindow.isVisible() === false) {
    mainWindow.show()
  }
  mainWindow.focus()
}

function createAppIcon() {
  const iconPath = path.join(__dirname, "./src/assets/app.ico");
  appIcon = new Tray(iconPath)
  const appName = app.getName()
  appIcon.setToolTip(appName);
  const contextMenu = Menu.buildFromTemplate([{
    label: "打开主窗口",
    click: function () {
      toggleMainWindow()
    }
  }, {
    label: "退出",
    click: function () {
      app.quit();
    }
  }])
  appIcon.setContextMenu(contextMenu);
  appIcon.on("click", toggleMainWindow);
}

function placeMainWindow() {
  if (!mainWindow) {
    console.log("place main window, but no main window")
    return
  }
  const iconBounds = appIcon.getBounds()
  const windowBounds = mainWindow.getBounds()
  let y = 0;
  let x = Math.round(iconBounds.x + (iconBounds.width - windowBounds.width) / 2)
  if (process.platform === "darwin") {
    y = Math.round(iconBounds.y + iconBounds.height + 5)
  } else {
    y = Math.round(iconBounds.y - windowBounds.height - 5)
  }
  mainWindow.setPosition(x, y)
}

function createMainWindow() {
  console.log("call createMainWindow");
  mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    resizable: false,
    show: false,
    frame: false
  })
  mainWindow.loadFile("index.html")
  mainWindow.on("closed", function (e) {
    console.log("main window closed");
    mainWindow = null
  }),
  mainWindow.on("blur", function (e) {
    mainWindow.hide()
  })
}