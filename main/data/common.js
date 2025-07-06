const path     = require('node:path')  

shared_folder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")
console.log(`shared_folder: ${shared_folder}`)

//---------------------------------------------------------------
function getSharedPath() {
  return shared_folder;
}

//---------------------------------------------------------------
function getDatabaseLocation() {
  const dbFullPath = path.join(shared_folder, 'Attendance', 'AttendanceV2.db');
  return dbFullPath;
}


module.exports = {getDatabaseLocation, getSharedPath};

