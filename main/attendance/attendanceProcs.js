const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}       = require(path.join(__dirname, '..', 'data', 'common'));
const {formatCheckinDate}         = require(path.join(__dirname, '..', 'common', 'format_date'));
const {formatCheckinTime}         = require(path.join(__dirname, '..', 'common', 'format_date'));
const {formatCheckinDateTime}     = require(path.join(__dirname, '..', 'common', 'format_date'));
const {formatDateWithDay}         = require(path.join(__dirname, '..', 'common', 'format_date'));
const {getStudentFieldsByBadge}   = require(path.join(__dirname, '..', 'students', 'studentSearchProcs'));
const {getClassDetailsByDateTime }= require(path.join(__dirname, '..', 'schedule', 'classQueries'));
const {getClassDetailsForCheckin }= require(path.join(__dirname, '..', 'schedule', 'classQueries'));

// select badgeNumber,
//        cast(strftime('%w', a.checkinDateTime) as integer) as classDayNum,
//        c.classDayOfWeek,
//        a.checkinTime,
//        c.classStartTime,
//        c.classFinisTime,
//        case when a.checkinTime between c.classStartTime and c.classFinisTime
//             then c.classNum else null
//        end as classFound,
//        c.classNum
// from   attendance a 
// left   join   classes    c
//   on   cast(strftime('%w', a.checkinDateTime) as integer) = c.classDayOfWeek
//   and  a.checkinTime between c.classStartTime and c.classFinisTime
// where  badgeNumber = 1656
// order  by a.checkinDateTime desc


// select *
// from   vw_attendance_timestamps_v2  a
// left   join   classes    c
//   on   cast(strftime('%w', a.checkinDateTime) as integer) = c.classDayOfWeek
//   and  a.timeStampValue between c.classCheckinStart and c.classCheckinFinis
// where  a.badgeNumber = 1699
// order  by a.attendance_id desc



//-----------------------------------------------------------------------------------
const checkinReturnData = {
  'status'  : null,
  'message' : null,
  'studentName' : null,
  'checkinDateTime' : null,
  'studentImageType': null,
  'studentImageBase64': null,
  'nextPromotion': null
}

//-----------------------------------------------------------------------------------
function GetCheckinDatetime() {
  const crnt_datetime = new Date();crnt_datetime.toISOString().replace('T', ' ')
  const checkinDateTime = formatCheckinDateTime(crnt_datetime);
  const checkinDate     = formatCheckinDate(crnt_datetime);
  const checkinTime     = formatCheckinTime(crnt_datetime);    
  const checkinDay      = crnt_datetime.getDay();
  const checkinHours    = crnt_datetime.getHours();
  const checkinMins     = crnt_datetime.getMinutes();
  const checkinFmt      = `${checkinHours}.${String(checkinMins).padStart(2, '0')}`;
  return {
    'checkinDateTime' :checkinDateTime, 
    'checkinDate'     :checkinDate, 
    'checkinTime'     :checkinTime, 
    'checkinDay'      :checkinDay, 
    'checkinHours'    :checkinHours, 
    'checkinMins'     :checkinMins, 
    'checkinFmt'      :checkinFmt
  }
}

//-----------------------------------------------------------------------------------
function studentExists(searchData) {
  try {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const studentData = getStudentFieldsByBadge(searchData);
    if (studentData) {return true;}
    else  {return false;}
  } 
  catch (err) {
    return false;
  } 
};

//-----------------------------------------------------------------------------------
function insertCheckinRecord(badgeNumber) {
  const searchData        = {'badgeNumber': badgeNumber};
  const checkinDateFields = GetCheckinDatetime();
  try {
    if (!studentExists(searchData)) {
      checkinReturnData.status   = 'err';
      checkinReturnData.message  = `Badge number was not found: ${badgeNumber}!`;
      checkinReturnData.checkinDateTime    = checkinDateFields.checkinDateTime;
      checkinReturnData.studentImageType   = 'png';
      checkinReturnData.studentImageBase64 = "/misc_images/rising-sun-martial-arts-logo.png";
      return checkinReturnData;
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const studentData = getStudentFieldsByBadge(searchData);


    const classDetailsList = getClassDetailsByDateTime(checkinDateFields.checkinDateTime);
    const classDetailsCheckin = getClassDetailsForCheckin(checkinDateFields);
    const classDetails = {};
    if (classDetailsList.length == 0) {
      classDetails.classNum = -1;
      classDetails.styleNum = -1;
    } else if (classDetailsList.length == 1) {
      classDetails.classNum = classDetailsList[0].classNum;
      classDetails.styleNum = classDetailsList[0].styleNum;
    } else {
      console.err(`Multiple classes found for: ${JSON.stringify(checkinDateFields)}`)
      throw new Error(`Multiple classes found for: ${JSON.stringify(checkinDateFields)}`);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const studentName = `${studentData.firstName} ${studentData.lastName}`;
    const insertCheckInStmt = `
      INSERT INTO attendance(
        badgeNumber, 
        checkinDateTime, 
        checkinDate, 
        checkinTime, 
        studentName, 
        classNum,
        styleNum
      )
      VALUES(
        :badgeNumber, 
        :checkinDateTime, 
        :checkinDate, 
        :checkinTime, 
        :studentName, 
        cast(:classNum as integer),
        cast(:styleNum as integer)
      );`

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const insertStmt   = db.prepare(insertCheckInStmt);
    console.log(`insertCheckinRecord:classDetails: ${JSON.stringify(classDetails)}`);
    const results      = insertStmt.run({
      'badgeNumber'     :badgeNumber, 
      'checkinDateTime' :checkinDateFields.checkinDateTime, 
      'checkinDate'     :checkinDateFields.checkinDate, 
      'checkinTime'     :checkinDateFields.checkinTime,
      'studentName'     :studentName,
      'classNum'        :classDetails.classNum,
      'styleNum'        :classDetails.styleNum
    });
    db.close()

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    checkinReturnData.status  = 'ok';
    checkinReturnData.message = `${studentName} was checked in at:`;
    const crnt_datetime = new Date();crnt_datetime.toISOString().replace('T', ' ')
    checkinReturnData.checkinDateTime    = formatDateWithDay(crnt_datetime); 
    checkinReturnData.nextPromotion      = `Next promotion: *** classes`;
    if (classDetailsCheckin.length>0) {
      checkinReturnData.className          = `${classDetailsCheckin[0].className}`;
    } else {
      checkinReturnData.className          = `Class name: Unknown!`;
    }

    //checkinReturnData.className          = `Class name: ${getClassName(badgeNumber)}`;
    checkinReturnData.classesAttended    = `Classes attended: ${getAttendanceCount(badgeNumber)}`;
    checkinReturnData.studentImageType   = studentData.studentImageType;
    checkinReturnData.studentImageBase64 = studentData.studentimageBase64;
    return checkinReturnData;
  } 
  catch (err) {
    console.error(`insertCheckinRecord: ${err.message}`)
    checkinReturnData.status = 'err';
    checkinReturnData.message = `Internal errror: ${err.message}!`;
    checkinReturnData.checkinDateTime = checkinDateFields.checkinDateTime;
    return checkinReturnData;
  } 
}

const getAttendanceCountStmt = `
  select count(*) as attendanceCount
  from   attendance
  where  badgeNumber = :badgeNumber
`
function getAttendanceCount(badgeNumber) {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(getAttendanceCountStmt);
    const row          = searchStmt.get({'badgeNumber' : badgeNumber});
    db.close();
    return row.attendanceCount;
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}

module.exports = {insertCheckinRecord}