const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}     = require(path.join(__dirname, '..', 'data', 'common'));

//-----------------------------------------------------------------------------------
const attendanceReturnData = {
  'attendance_id' : null,
  'badgeNumber' : null,
  'checkinDateTime' : null,
  'checkinDate' : null,
  'checkinTime' : null,
  'studentName' : null,
  'studentStatus' : null,
  'className' : null,
  'rankName' : null,
  'classStartTime' : null,
}

//-----------------------------------------------------------------------------------
const weekEndDates = `
  with recursive cte_week_offsets (n) as (
    select 0
    union all
    select n -7 from cte_week_offsets where n > -1024
  ), cte_start_end_dates as (
    select cte.n as endoffset ,
          lead(cte.n, 1, 0) over (order by cte.n desc) as startoffset,
          row_number() over (order by cte.n desc) as row_num
    from   cte_week_offsets cte
  )
  select date('now', 'weekday 0',  cte2.startoffset || ' days') as startSundayDate, 
        date('now', 'weekday 0',  cte2.endoffset   || ' days') as endSundayDate,
        cte2.*
  from   cte_start_end_dates  cte2
  where  cte2.row_num < 53
`
//-----------------------------------------------------------------------------------
function GetWeekEndDates (data) {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const weekDates    = db.prepare(weekEndDates).all();
    db.close();
    return weekDates;
  } catch (err) {
    console.error('Error in sundayEndDates', err); 
    throw err; 
  } 
}

module.exports = {GetWeekEndDates}