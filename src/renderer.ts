// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var container = document.querySelector("h2")

var p = document.createElement("p")
p.innerHTML = "JYX"
p.style.margin = "10px auto";
container.append(p)