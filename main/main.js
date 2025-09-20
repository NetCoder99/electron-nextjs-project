const { app, ipcMain, BrowserWindow, Menu } = require("electron");
const  serve   = require("electron-serve");
const  path    = require("path");
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
    width: 1200,
    height: 900,
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
const {searchStudents}           = require(path.join(__dirname, 'students', 'studentSearchProcs'));
const {saveStudentData}          = require(path.join(__dirname, 'students', 'studentSaveProcs'));
const {selectStudentPicture}     = require(path.join(__dirname, 'students', 'studentPictures'));
const {createStudentBadge}       = require(path.join(__dirname, 'badge',    'badge_procs'));
ipcMain.handle('handleSelectPicture', async (event, data) => {
  return selectStudentPicture(data);
})
ipcMain.handle('handleStudentSearchClick', async (event, data) => {
  return searchStudents(data);
})
ipcMain.handle('handleSaveCreate', async (event, data) => {
  return saveStudentData(data);
})
ipcMain.handle('handleCreateBadge', async (event, data) => {
  return createStudentBadge(data);
})


// --------------------------------------------------------------------------
const {insertCheckinRecord}           = require(path.join(__dirname, 'attendance', 'attendanceProcs'));
ipcMain.handle('handleCheckin', async (event, data) => {
  return insertCheckinRecord(data);
})

const {GetWeekEndDates}           = require(path.join(__dirname, 'attendance', 'attendanceSearch'));
ipcMain.handle('handleAttendanceSearch', async (event, data) => {
  return GetWeekEndDates(data);
})

// --------------------------------------------------------------------------
const {GetStudentPromotionsV2}      = require(path.join(__dirname, 'promotions', 'promotionsInit'));
ipcMain.handle('handleGetPromotions', async (event, badgeData) => {
  console.log(`handleGetPromotions: ${badgeData}`);
  return GetStudentPromotionsV2(badgeData);
})

// --------------------------------------------------------------------------
ipcMain.handle('handleSaveClassSchedule', async (event, classData) => {
  console.log(`handleSaveClassSchedule: ${classData}`);
})
ipcMain.handle('handleDisplayClassDetails', async (event, classData) => {
  console.log(`handleDisplayClassDetails: ${classData}`);
})

// --------------------------------------------------------------------------
const {validateClassFields}      = require(path.join(__dirname, 'schedule', 'classValidate'));
const {saveClassDetails}         = require(path.join(__dirname, 'schedule', 'classQueries'));
ipcMain.handle('handleSaveClassDetails', async (event, classData) => {
  console.log(`handleSaveClassSchedule: ${classData}`);
  const classValidateResults = validateClassFields(classData);
  if (classValidateResults.validity != 'ok') {
    return classValidateResults;
  }
  else {
    saveResults = saveClassDetails(classData);
    console.log(`handleSaveClassSchedule: ${classData}`);
    return saveResults;
  }
})
