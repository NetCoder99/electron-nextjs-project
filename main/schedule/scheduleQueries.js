const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}     = require(path.join(__dirname, '..', 'data', 'common'));

const daysOfWeekStmt = `
  select dayOfWeek, dayName 
  from   vw_days_of_week vdow 
`
// ----------------------------------------------------------------------------------------------
function getDaysOfWeek() {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(daysOfWeekStmt);
    const rows         = searchStmt.all();
    db.close();
    return rows;
  } catch (err) {
    console.error('Error: getting days of week.', err); throw err; 
  } 
}

module.exports = {
  getDaysOfWeek
}