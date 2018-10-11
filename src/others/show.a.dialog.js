const $ = require("jquery")
const {
  dialog
} = require("electron").remote

const $btn = $(".show-message-dialog-btn")

$btn.on("click", function (e) {
  dialog.showMessageBox({
    type: "info",
    title: "INFO",
    message: "Hello, World"
  })
})