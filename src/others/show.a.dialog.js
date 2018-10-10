const $ = require("jquery")
const {
  dialog
} = require("electron").remote

const $btn = $(".show-message-dialog-btn")
console.log($btn);

$btn.on("click", function (e) {
  dialog.showMessageBox({
    type: "info",
    title: "dialog",
    message: "this is a base dialog"
  })
})