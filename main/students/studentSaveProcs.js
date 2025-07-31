const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}    = require(path.join(__dirname, '..', 'data', 'common'));
const {formatCheckinDate}      = require(path.join(__dirname, '..', 'common', 'format_date'));
const {validateStudentFields}  = require(path.join(__dirname, 'studentValidate'));
const {getStudentDataByName}   = require(path.join(__dirname, 'studentSearchProcs'));
const {getBeltNames}           = require(path.join(__dirname, '..', 'ranks', 'rankProcs'));

// ----------------------------------------------------------------------------------------------
function saveStudentData(studentData) {
  try {
    const validStatus = validateStudentFields(studentData);
    console.log(`saveStudentData:validStatus -> ${JSON.stringify(validStatus)}`);
    if (validStatus.validity == 'err') {
      return validStatus;
    }

    // if the badge number is blank, we are creating a new student record
    if (studentData.badgeNumber < 1) {
      console.log(`saveStudentData:Creating Student -> ${JSON.stringify(validStatus)}`);
      const getResponse = getStudentDataByName(studentData);
      if (getResponse.length > 0) {
        validStatus.validity    = 'err';
        validStatus.saveMessage = 'Student record already exists.'
        return validStatus;
      }
      studentData.badgeNumber = getNewBadgeNumber().nextBadgeNumber;
      insertStudentData(studentData);
      validStatus.saveMessage = 'Student record was created.'
      return validStatus;
    } else {
      console.log(`saveStudentData:Updating Student -> ${JSON.stringify(validStatus)}`);
      updateStudentData(studentData);
      validStatus.saveMessage = 'Student record was updated.'
      return validStatus;
    }

  } catch(err) {
    console.log(`saveStudentData failed`);
    studentData.validity    = 'err';
    studentData.saveMessage = err.toString();
    return studentData;
  }
}

// ----------------------------------------------------------------------------------------------
const newBadgeStatement = `
  select max(s.badgeNumber) + 5 as nextBadgeNumber
  from   students s 
  where  length(s.badgeNumber) > 0
`
function getNewBadgeNumber() {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(newBadgeStatement);
    const row          = searchStmt.get();
    db.close();
    return row;
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}

// ----------------------------------------------------------------------------------------------
const insertStudentStmt = `
  INSERT INTO students
  (
    badgeNumber, 
    firstName, 
    lastName, 
    namePrefix, 
    email, 
    address, 
    address2, 
    city, 
    country, 
    state, 
    zip, 
    birthDate, 
    phoneHome, 
    phoneMobile, 
    status, 
    memberSince, 
    gender, 
    currentRank, 
    currentRankName,
    ethnicity, 
    studentImageBytes, 
    studentImagePath, 
    studentImageBase64,
    middleName, 
    studentImageName, 
    studentImageType
  )
  VALUES(
    :badgeNumber, 
    :firstName, 
    :lastName, 
    :namePrefix, 
    :email, 
    :address, 
    :address2, 
    :city, 
    :country, 
    :state, 
    :zip, 
    :birthDate, 
    :phoneHome, 
    :phoneMobile, 
    :status, 
    :memberSince, 
    :gender, 
    :currentRank, 
    :currentRankName,
    :ethnicity, 
    :studentImageBytes, 
    :studentImagePath, 
    :studentImageBase64,
    :middleName, 
    :studentImageName, 
    :studentImageType
  );
`
function insertStudentData(studentData) {
  try {
    const beltNames = getBeltNames();
    const beltEntry  = beltNames.find(belt => belt.beltId === parseInt(studentData.currentRank));

    console.log(`insertStudentData: ${JSON.stringify(studentData)}`);
    const day     = studentData.birthDate.slice(8, 10);
    const month   = studentData.birthDate.slice(5, 7);
    const year    = studentData.birthDate.slice(0, 4);
    const fmtDate = `${month}/${day}/${year}`;

    const sinceDateFmt = formatCheckinDate(new Date());

    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    db_info = db.prepare(insertStudentStmt)
      .run({
         'badgeNumber'   : studentData.badgeNumber
        ,'firstName'     : studentData.firstName
        ,'middleName'    : null
        ,'lastName'      : studentData.lastName
        ,'namePrefix'    : null
        ,'email'         : studentData.email
        ,'address'       : studentData.address
        ,'address2'      : studentData.address2
        ,'city'          : studentData.city
        ,'country'       : studentData.country
        ,'state'         : studentData.state
        ,'zip'           : studentData.zipCode
        ,'birthDate'     : fmtDate
        ,'phoneHome'     : studentData.phoneHome
        ,'phoneMobile'   : null
        ,'status'        : 'Active'
        ,'memberSince'   : sinceDateFmt
        ,'gender'        : null
        ,'currentRank'       : studentData.currentRank
        ,'currentRankName'   : beltEntry.beltTitle
        ,'ethnicity'         : null
        ,'studentImagePath'    : studentData.studentImagePath
        ,'studentImageName'    : studentData.studentImageName
        ,'studentImageType'    : studentData.studentImageType
        ,'studentImageBytes'   : null
        ,'studentImageBase64'  : studentData.studentimageBase64
      });
    db.close();
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}


// ----------------------------------------------------------------------------------------------
const updateStudentStmt = `
  update students
  set    firstName   = :firstName,
         lastName    = :lastName,
         address     = :address,
         address2    = :address2,
         city        = :city,
         state       = :state,
         birthDate   = :birthDate,
         state       = :state,
         zip         = :zip,
         phoneHome   = :phoneHome,
         email       = :email,
         currentRank        = :currentRank,
         currentRankName    = :currentRankName,
         studentImagePath   = :studentImagePath,
         studentImageName   = :studentImageName,
         studentImageType   = :studentImageType,
         studentImageBase64 = :studentimageBase64
    where  badgeNumber = :badgeNumber;        
`
function updateStudentData(studentData) {
  try {
    const beltNames = getBeltNames();
    const beltEntry  = beltNames.find(belt => belt.beltId === parseInt(studentData.currentRank));

    day     = studentData.birthDate.slice(8, 10);
    month   = studentData.birthDate.slice(5, 7);
    year    = studentData.birthDate.slice(0, 4);
    fmtDate = `${month}/${day}/${year}`;
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    db_info = db.prepare(updateStudentStmt)
      .run({
        'firstName'   : studentData.firstName,
        'lastName'    : studentData.lastName,
        'birthDate'   : fmtDate,
        'address'     : studentData.address,
        'address2'    : studentData.address2,
        'city'        : studentData.city,
        'state'       : studentData.state,
        'zip'         : studentData.zipCode,
        'phoneHome'   : studentData.phoneHome,
        'email'       : studentData.email,
        'badgeNumber' : studentData.badgeNumber,
        'currentRank'       : studentData.currentRank,
        'currentRankName'   : beltEntry.beltTitle,
        'studentImagePath'  : studentData.studentImagePath,
        'studentImageName'  : studentData.studentImageName,
        'studentImageType'  : studentData.studentImageType,
        'studentimageBase64': studentData.studentimageBase64

      });
    db.close();
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}

module.exports = {
  saveStudentData
}