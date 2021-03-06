# electron-garden

## 主进程和渲染进程  

程序启动时按照指定的`main.js`去执行，这时候创建了主进程。在主进程里可以用`BrowserWindow`去创建窗口，在这个窗口里，渲染就交给了对应的渲染进程。主进程和渲染进程已经分开了。假设界面上有个按钮要开新窗口，那么就是在渲染进程里开启新的窗口，这时候不能使用`const { BrowserWindow } = require("electron")`，此时这么做访问不到`BrowserWindow`，要用`require("electron").remote`。electron分离了主进程和渲染进程可选择的api。  

`main.js`加载了`index.html`,在`index.html`里`require`了几个外部`js`文件。`main.js`里的代码执行在主进程，但是后续`index.html`加载的代码就运行在渲染进程里，因为已经加载了窗口了，所以在这些代码里，就要用`remote`才可以。  

## 调试  

主进程调试可以用`laungh.json`的方式去启动，就可以在`vscode`里断点了，但是渲染进程不能这么用，断不到。可以用它对应页面的`devTool`

---

原本想在`show.heart.window.js`里创建`heartWindow`后直接操作dom，绑定事件，创建图案，但是**不行**。  
因为点击按钮创建窗口之后，新建的窗口就在一个新的渲染进程里，从当前的`show.heart.window.js`所在进程里无法访问新窗口的dom结构，所以失败。  
(那么也是有方法的，借助进程间通信。在主进程和渲染进程间用`ipcMain`和`ipcRenderer`实现通信。双方只是监听事件，并不特定这个事件是从哪个进程发出的)