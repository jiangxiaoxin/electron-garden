const { BrowserWindow } = require("electron").remote
const path = require("path")
const btns = document.getElementsByClassName("show-heart-window-btn")
const btn = btns[0]
btn.addEventListener("click", () => {
  createHeartWindow()
})

let heartWindow = null
function createHeartWindow() {
  heartWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  heartWindow.on("close", () => {
    heartWindow = null
  })

  let url = path.join("file://", __dirname, "../template/heart.window.html")
  heartWindow.loadURL(url)
  heartWindow.webContents.openDevTools()
  heartWindow.show();
}