// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let container = document.querySelector("h2");

let p = document.createElement("p");
p.innerHTML = "JYX";
p.style.margin = "10px auto";
container.append(p);

let btn = document.querySelector("button");
btn.addEventListener("click", () => {
  window.alert("hello");
});
