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
  }
}

function secondInstanceHandler(event, commandLine, workingDirectory) {
  console.log("second-instance");
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  }
}


function readyHandler(e) {
  console.log("app ready");
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

function createAppIcon() {
  const iconPath = path.join(__dirname, "./src/assets/app.ico");
  appIcon = new Tray(iconPath)
  const appName = app.getName()
  appIcon.setToolTip(appName);
  const contextMenu = Menu.buildFromTemplate([{
    label: "打开主窗口",
    click: function () {
      //TODO:这里直接调用createMainWindow，如果真的重新创建窗口，那么应该也没事吧
      createMainWindow();
    }
  }, {
    label: "退出",
    click: function () {
      app.quit();
    }
  }])
  appIcon.setContextMenu(contextMenu);
}

function createMainWindow() {
  console.log("call createMainWindow");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    center: true,
    show: false
  })
  mainWindow.loadFile("index.html")
  mainWindow.on("closed", function (e) {
    console.log("main window closed");
  })
  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
  })
}