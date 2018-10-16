const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow;

var btn = document.querySelector(".get-all-windows-btn")
btn.addEventListener("click", (e) => {
  var windows = BrowserWindow.getAllWindows()
  console.log(windows);
})

