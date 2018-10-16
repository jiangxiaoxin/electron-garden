const {
  app,
  BrowserWindow
} = require('electron')

let mainWindow = null

// 在主进程里这么访问可以，因为process就是当前的主进程，在渲染进程里不能如此判断是否debug模式
const debug = /--debug/.test(process.argv[2])
console.log(`debug: ${debug}`)

const windowConfig = {
  width: 1200,
  height: 600
}

app.on("ready", readyHandler)

// activate这个事件只有mac上才会调用
app.on("activate", activateHandler)

app.on("window-all-closed", allClosedHandler)

app.on("browser-window-created", function (e) {
  console.log("browser-window-created");
  console.log(e);
})

function createWindow() {
  mainWindow = new BrowserWindow(windowConfig)
  mainWindow.loadFile("index.html")
  mainWindow.on("closed", function (e) {
    console.log("main window closed");
  })

  if (debug) {
    mainWindow.webContents.openDevTools();
  }

}

function readyHandler(e) {
  console.log("app ready");
  createWindow();

  // 添加laungh.json后可以从vscode里直接启动调试
  // const array = [1,2,3,4]
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  //   console.log(element)
  // }
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

exports.funcInMain = () => {
  window.alert("call func in main process");
}