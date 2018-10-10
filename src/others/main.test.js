const { BrowserWindow } = require("electron").remote
var btn = document.querySelector(".get-all-windows-btn")
btn.addEventListener("click", (e) => {
  var windows = BrowserWindow.getAllWindows()
  console.log(windows);
})