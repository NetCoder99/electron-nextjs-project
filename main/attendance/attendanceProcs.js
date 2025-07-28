const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}     = require(path.join(__dirname, '..', 'data', 'common'));
const {formatCheckinDate}       = require(path.join(__dirname, '..', 'common', 'format_date'));
const {formatCheckinTime}       = require(path.join(__dirname, '..', 'common', 'format_date'));
const {formatCheckinDateTime}   = require(path.join(__dirname, '..', 'common', 'format_date'));
const {formatDateWithDay}       = require(path.join(__dirname, '..', 'common', 'format_date'));
const {getStudentFieldsByBadge} = require(path.join(__dirname, '..', 'students', 'studentSearchProcs'));

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
  return {
    'checkinDateTime' :checkinDateTime, 
    'checkinDate'     :checkinDate, 
    'checkinTime'     :checkinTime, 
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

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const studentName = `${studentData.firstName} ${studentData.lastName}`;
    const insertCheckInStmt = `
      INSERT INTO attendance(badgeNumber, checkinDateTime, checkinDate, checkinTime, studentName)
      VALUES(:badgeNumber, :checkinDateTime, :checkinDate, :checkinTime, :studentName);`

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const insertStmt    = db.prepare(insertCheckInStmt);
    insertStmt.run({
      'badgeNumber'     :badgeNumber, 
      'checkinDateTime' :checkinDateFields.checkinDateTime, 
      'checkinDate'     :checkinDateFields.checkinDate, 
      'checkinTime'     :checkinDateFields.checkinTime, 
      'studentName'     :studentName});
    db.close()

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    checkinReturnData.status  = 'ok';
    checkinReturnData.message = `${studentName} was checked in at:`;
    const crnt_datetime = new Date();crnt_datetime.toISOString().replace('T', ' ')
    checkinReturnData.checkinDateTime    = formatDateWithDay(crnt_datetime); 
    checkinReturnData.nextPromotion      = `Next promotion: *** classes`;
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

module.exports = {insertCheckinRecord}