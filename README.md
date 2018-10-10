# electron-garden

## 主进程和渲染进程  

程序启动时按照指定的`main.js`去执行，这时候创建了主进程。在主进程里可以用`BrowserWindow`去创建窗口，在这个窗口里，渲染就交给了对应的渲染进程。主进程和渲染进程已经分开了。假设界面上有个按钮要开新窗口，那么就是在渲染进程里开启新的窗口，这时候不能使用`const { BrowserWindow } = require("electron")`，此时这么做访问不到`BrowserWindow`，要用`require("electron").remote`。electron分离了主进程和渲染进程可选择的api。

## 调试  

主进程调试可以用`laungh.json`的方式去启动，就可以在`vscode`里断点了，但是渲染进程不能这么用，断不到。可以用它对应页面的`devTool`
