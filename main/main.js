const { app, ipcMain, BrowserWindow } = require("electron");
const  serve = require("electron-serve");
const  path  = require("path");
let    log   = require("electron-log")

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  log.info("Creating main window");
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    AutoHideMenuBar: true,    
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  if (app.isPackaged) {
    log.info("Running packaged app.");
    appServe(win)
      .then(() => {win.loadURL("app://-");});
  } else {
    log.info("Running development app.");
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
}

app.on("ready", () => {
    createWindow();
});

ipcMain.on('addNewRequirement', (event, studentDate) => {
  console.log(`addNewRequirement was clicked`);
})  

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});