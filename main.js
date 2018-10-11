const {
  app,
  BrowserWindow
} = require('electron')

let mainWindow = null

const debug = /--debug/.test(process.argv[2])
console.log(`debug: ${debug}`)

app.on("ready", readyHandler)
app.on("activate", activateHandler)
app.on("window-all-closed", allClosedHandler)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    center: true
  })
  mainWindow.loadFile("index.html")
  mainWindow.on("closed", function(e) {
    console.log("main window closed");
  })

  if (debug) {
    mainWindow.webContents.openDevTools();
  }
  
}

function readyHandler(e) {
  console.log("app ready");
  createWindow();
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

/**
 * windows窗口都关掉之后就意味着程序结束了，mac关闭窗口后并没有结束，其按钮栏还在，程序还是存活的
 */
function allClosedHandler(e) {
  console.log("app all windows closed");
  if (process.platform !== "darwin") {
    app.quit();
  }
}

