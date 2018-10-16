"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs = require("fs");
var test_1 = require("./com/test");
var openFile = document.getElementById("open-file-btn");
openFile.addEventListener("click", function () {
    try {
        var files = electron_1.remote.dialog.showOpenDialog({
            properties: ["openFile"],
            filters: [
                { name: "image", extensions: ["png", "jpg"] }
            ]
        });
        if (!files || files.length === 0) {
            console.log("没取到文件");
            return;
        }
        var file = files[0];
        console.log("\u8BFBfile: " + file);
        fs.stat(file, function (err, stats) {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log(stats);
        });
    }
    catch (error) {
        console.error("read file error: " + error.message);
    }
});
var alertBtn = document.getElementById("win-alert-btn");
alertBtn.onclick = function () {
    test_1.loop();
};
//# sourceMappingURL=renderer.js.map