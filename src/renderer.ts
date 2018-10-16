import { remote } from "electron";
import * as fs from "fs";
import { loop } from "./com/test";

let openFile = document.getElementById("open-file-btn");
openFile.addEventListener("click", () => {
  try {
    let files = remote.dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "image", extensions: ["png", "jpg"] }
      ]
    });

    if (!files || files.length === 0) {
      console.log("没取到文件");
      return;
    }

    let file = files[0];
    console.log(`读file: ${file}`);

    fs.stat(file, (err, stats) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(stats);
    })

  } catch (error) {
    console.error(`read file error: ${error.message}`);
  }
})

let alertBtn = document.getElementById("win-alert-btn");
alertBtn.onclick = () => {
  loop();
}