const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}     = require(path.join(__dirname, '..', 'data', 'common'));

const daysOfWeekStmt = `
  select dayOfWeek, cast(dayOfWeek as integer) as dayNum, dayName 
  from   vw_days_of_week vdow 
  limit 3
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

// ----------------------------------------------------------------------------------------------
const getClassesByWeekStmt = `
  select vdow.dayName,
        row_number() over (partition by vdow.dayOfWeek order by vdow.dayOfWeek, c.classStartTime) as classNumByDay,
        case when row_number() over (partition by vdow.dayOfWeek order by vdow.dayOfWeek, c.classStartTime) = 1
              then vdow.dayName else '' 
        end as dayNameDisplay,     
        vdow.dayOfWeek, 
        c.classStartTime,
        c.classFinisTime,
        c.classStartTime || ' TO ' || c.classFinisTime as classDisplayTime,
        c.className
  from   vw_days_of_week vdow 
  left   join   classes c 
    on   vdow.dayOfWeek = c.classDayOfWeek 
  order  by vdow.dayOfWeek,c.classStartTime  
`
// ----------------------------------------------------------------------------------------------
function getClassesByWeek() {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(getClassesByWeekStmt);
    const rows         = searchStmt.all();
    db.close();
    return rows;
  } catch (err) {
    console.error('Error: getting days of week.', err); throw err; 
  } 
}

// ----------------------------------------------------------------------------------------------
const getClassesByDayStmt = `
  select vdow.dayName,
        row_number() over (partition by vdow.dayOfWeek order by vdow.dayOfWeek, c.classStartTime) as classNumByDay,
        case when row_number() over (partition by vdow.dayOfWeek order by vdow.dayOfWeek, c.classStartTime) = 1
              then vdow.dayName else '' 
        end as dayNameDisplay,     
        vdow.dayOfWeek, 
        c.classStartTime,
        c.classFinisTime,
        c.classStartTime || ' TO ' || c.classFinisTime as classDisplayTime,
        c.className
  from   vw_days_of_week vdow 
  left   join   classes c 
    on   vdow.dayOfWeek = c.classDayOfWeek 
  where  cast(vdow.dayOfWeek as integer) = :dayNum
  order  by vdow.dayOfWeek,c.classStartTime  
`
// ----------------------------------------------------------------------------------------------
function getClassesByDay(dayOfWeek) {
  try {
    console.log(`getClassesByDay: ${JSON.stringify(dayOfWeek)}`);
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(getClassesByDayStmt);
    const rows         = searchStmt.all({'dayNum' : dayOfWeek});
    db.close();
    return rows;
  } catch (err) {
    console.error('Error: getting days of week.', err); throw err; 
  } 
}



module.exports = {
  getDaysOfWeek,
  getClassesByDay,
  getClassesByWeek
}