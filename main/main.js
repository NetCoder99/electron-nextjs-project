const { app, ipcMain, BrowserWindow, Menu } = require("electron");
const  serve   = require("electron-serve");
const  path    = require("path");
//const  appRoot = require('app-root-path');
let    log     = require("electron-log")

Menu.setApplicationMenu(false)

// --------------------------------------------------------------------------
const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

// --------------------------------------------------------------------------
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

// --------------------------------------------------------------------------
app.on("ready", () => {
    createWindow();
});


// --------------------------------------------------------------------------
app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});

// --------------------------------------------------------------------------
addRankRequirementPath      = path.join(__dirname, 'ranks', 'rankProcs');
const {
  addRankRequirement, 
  saveRankRequirement, 
  getRankRequirements, 
  delRankRequirements
} = require(addRankRequirementPath);
ipcMain.handle('handleAddClick', async (event, data) => {
  return addRankRequirement(data);
})
ipcMain.handle('handleSaveClick', async (event, data) => {
  return saveRankRequirement(data);
})
ipcMain.handle('handleGetRequirements', async (event, data) => {
  return getRankRequirements();
})
ipcMain.handle('handleDelRequirements', async (event, index) => {
  return delRankRequirements(index);
})

// --------------------------------------------------------------------------
studentsPath        = path.join(__dirname, 'students', 'studentSearchProcs');
studentPicturesPath = path.join(__dirname, 'students', 'studentPictures');
const {getStudentFieldsByBadge}  = require(studentsPath);
const {searchStudentDataByName}  = require(studentsPath);
const {selectStudentPicture}     = require(studentPicturesPath);


// ipcMain.handle('handleGetStudentImage', async (event, searchData) => {
//   return getStudentImageByBadge(searchData);
// })
ipcMain.handle('handleGetStudentFields', async (event, searchData) => {
  return getStudentFieldsByBadge(searchData);
})

ipcMain.handle('handleStudentSearchClick', async (event, data) => {
  return searchStudentDataByName(data);
})
ipcMain.handle('handleSelectPicture', async (event, data) => {
  return selectStudentPicture(data);
})
const {saveStudentData} = require(path.join(__dirname, 'students', 'studentCreate'));
ipcMain.handle('handleSaveCreate', async (event, data) => {
  return saveStudentData(data);
})


