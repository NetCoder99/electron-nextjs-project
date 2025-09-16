const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}     = require(path.join(__dirname, '..', 'data', 'common'));

// ----------------------------------------------------------------------------------------------
const classDetailsStatement = `
  select classNum, 
         className, 
         styleNum, 
         styleName, 
         classDayOfWeek, 
         classStartTime, 
         classDuration, 
         allowedRanks, 
         classDisplayTitle, 
         allowedAges
  from  classes
`

// ----------------------------------------------------------------------------------------------
function getClassDetailsByNum(classNum) {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const qryString    = classDetailsStatement + " where classNum = :classNum"
    const searchStmt   = db.prepare(qryString);
    const row          = searchStmt.get();
    db.close();
    return row;
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}
function getClassDetailsByName(className) {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const qryString    = classDetailsStatement + " where className = :className"
    const searchStmt   = db.prepare(qryString);
    const row          = searchStmt.get({'className':className});
    db.close();
    return row;
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}

// ----------------------------------------------------------------------------------------------
module.exports = {
  getClassDetailsByNum,
  getClassDetailsByName
}