const {
  BrowserWindow
} = require("electron").remote
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
    height: 600,
    show: false
  })
  console.log("heart window id ", heartWindow.id)
  heartWindow.on("close", () => {
    heartWindow = null
  })

  let url = path.join("file://", __dirname, "../pages/heart.window.html")
  heartWindow.on("ready-to-show", readyToShow)
  heartWindow.loadURL(url)
}

function readyToShow() {
  console.log("ready-to-show");
  heartWindow.show()
  heartWindow.webContents.openDevTools();
}

