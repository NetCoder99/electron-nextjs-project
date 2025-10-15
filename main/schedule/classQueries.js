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

const checkOverlapStmt = `
  select classDayOfWeek,
         classStartTime,
         classFinisTime,
         case when :startTime between classStartTime and classFinisTime 
               then 'true' else 'false'
         end  as isOverlapping     
  from   classes
  where  classDayOfWeek = :dayOfWeekNum
  and   :startTime between classStartTime and classFinisTime
`
function getClassOverlap(classDetails) {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const qryString    = checkOverlapStmt;
    const searchStmt   = db.prepare(qryString);
    const row          = searchStmt.get(
      {'startTime' : classDetails.startTime,'dayOfWeekNum' : classDetails.dayOfWeekNum});
    db.close();
    return row;
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}


// ----------------------------------------------------------------------------------------------
const saveClassDetailsStatement = `
INSERT INTO classes (
  className, 
  styleNum, 
  styleName, 
  classDayOfWeek, 
  classStartTime, 
  classFinisTime, 
  classDuration, 
  allowedRanks, 
  classDisplayTitle, 
  allowedAges
)
VALUES (
  :className, 
  :styleNum, 
  :styleName, 
  :classDayOfWeek, 
  :classStartTime, 
  :classFinisTime, 
  :classDuration, 
  :allowedRanks, 
  :classDisplayTitle, 
  :allowedAges
)`

// ----------------------------------------------------------------------------------------------
function saveClassDetails(classData) {
  console.log(`saveClassDetails: ${JSON.stringify(classData)}`);
  const allowedRanksStr = classData.allowedRanks.join(',');
  const insData = {
    'className'         : classData['className'],
    'styleNum'          : classData.styleNum,
    'styleName'         : classData.styleName,
    'classDayOfWeek'    : classData.dayOfWeekNum,
    'classStartTime'    : classData.startTime,
    'classFinisTime'    : classData.finisTime,
    'classDuration'     : classData.classDuration,
    'allowedRanks'      : classData.allowedRanks.join(','),
    'classDisplayTitle' : classData.className,
    'allowedAges'       : classData.allowedAges,
  };

  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const insertStmt   = db.prepare(saveClassDetailsStatement);
    const insResults   = insertStmt.run(insData);
    db.close();
    return {
      "saveMessage": 'New class has been saved',
      'lastInsertRowid' : insResults.lastInsertRowid,
      "focusField": null,
      "saveResult": "text-success",
      "validity": "ok",
    }
    //return row;
  } catch (err) {
    console.error('Error updating student data', err); 
    return {
      "saveMessage": 'Error: ' + err.message,
      "focusField": null,
      "saveResult": "text-danger",
      "validity": "err",
    }
  } 
}


const getClassDetailsByDateTimeStmt = `
  select c.classNum,
         c.className,
         c.styleNum,
         strftime('%w', :dateTimeStamp)     as dayOfWeek,
         CASE WHEN CAST(strftime('%H', :dateTimeStamp) AS INTEGER) <= 12
              THEN LTRIM(strftime('%H:%M AM',  datetime(:dateTimeStamp)), '0')
              ELSE        cast(strftime('%H',  datetime(:dateTimeStamp)) - 12 as text)  
                    || ':' ||   strftime('%M', datetime(:dateTimeStamp)) || ' PM' 
         END as classTime
  from   classes c 
  where  classDayOfWeek = strftime('%w', :dateTimeStamp)
  and    CASE WHEN CAST  (strftime('%H', :dateTimeStamp) AS INTEGER) <= 12
              THEN LTRIM (strftime('%H:%M AM', datetime(:dateTimeStamp)), '0')
              ELSE cast  (strftime('%H', datetime(:dateTimeStamp)) - 12 as text)  
                    || ':' || strftime('%M', datetime(:dateTimeStamp)) || ' PM' 
         END between classStartTime and classFinisTime 
`

function getClassDetailsByDateTime(checkInDateTime) {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(getClassDetailsByDateTimeStmt);
    const row          = searchStmt.all({'dateTimeStamp' : checkInDateTime});
    db.close();
    return row;
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}


// ----------------------------------------------------------------------------------------------
const getClassDetailsForCheckinStmt = `
  select c.classNum,
         c.className,
         c.styleNum,
         strftime('%w', :dateTimeStamp)     as dayOfWeek,
         CASE WHEN CAST(strftime('%H', :dateTimeStamp) AS INTEGER) <= 12
              THEN LTRIM(strftime('%H:%M AM',  datetime(:dateTimeStamp)), '0')
              ELSE        cast(strftime('%H',  datetime(:dateTimeStamp)) - 12 as text)  
                    || ':' ||   strftime('%M', datetime(:dateTimeStamp)) || ' PM' 
         END as classTime
  from   classes c 
  where  classDayOfWeek = :checkInDay
  and    :checkinFmt between c.classCheckinStart and c.classCheckInFinis 
`
function getClassDetailsForCheckin(checkinDateFields) {
  try {
    console.log(`getClassDetailsForCheckin: ${JSON.stringify(checkinDateFields)}`);
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(getClassDetailsForCheckinStmt);
    const row          = searchStmt.all({
      'dateTimeStamp' : checkinDateFields.dateTimeStamp,
      'checkInDay' : checkinDateFields.checkinDay,
      'checkinFmt' : checkinDateFields.checkinFmt
    });
    db.close();
    return row;
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}



// ----------------------------------------------------------------------------------------------
module.exports = {
  getClassDetailsByNum,
  getClassDetailsByName,
  getClassOverlap,
  getClassDetailsByDateTime,
  getClassDetailsForCheckin,
  saveClassDetails,
}