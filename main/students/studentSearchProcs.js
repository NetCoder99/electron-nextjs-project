const path     = require("path");
const sqlite3  = require('better-sqlite3');
//const { StudentFields } = require("./studentClass");
const getDatabaseLocationPath = path.join(__dirname, '..', 'data', 'common');
const {getDatabaseLocation}   = require(getDatabaseLocationPath);
const {formatDisplayDate}     = require(path.join(__dirname, '..', 'common', 'format_date'));

// ----------------------------------------------------------------------------------------------
const searchStudentStmt = `
  SELECT  badgeNumber 
       ,ifnull(firstName,  '') as firstName
       ,ifnull(middleName, '') as middleName 
       ,ifnull(lastName,   '') as lastName 
       ,ifnull(namePrefix, '') as namePrefix 
       ,ifnull(email,      '') as email
       ,ifnull(address,    '') as address
       ,ifnull(address2,   '') as address2
       ,ifnull(city,       '') as city
       ,ifnull(country,    '') as country
       ,ifnull(state,      '') as state
       ,ifnull(zip,        '') as zipCode
       ,ifnull(birthDate,  '') as birthDate
       ,ifnull(phoneHome,  '') as phoneHome
       ,ifnull(phoneMobile, '') as phoneMobile
       ,ifnull(status,      '') as status
       ,ifnull(memberSince, '') as memberSince
       ,ifnull(gender,      '') as gender
       ,ifnull(currentRank, '') as currentRank
       ,ifnull(ethnicity,   '') as ethnicity
       ,ifnull(studentImagePath,   '') as studentImagePath
       ,ifnull(studentimageBase64, 
        (select imageName 
         from   assets a 
         where  imageName = 'RSM_Logo2.webp'
         )) as studentImageName       
       ,ifnull(studentimageBase64, 
        (select imageType 
         from   assets a 
         where  imageName = 'RSM_Logo2.webp'
         )) as studentImageType       

       ,ifnull(studentimageBase64, 
        (select imageType 
         from   assets a 
         where  imageName = 'RSM_Logo2.webp'
         )) as studentImageType       
       ,ifnull(studentimageBase64, 
           (select imageBase64 
            from   assets a 
            where  imageName = 'RSM_Logo2.webp'
            )) as studentimageBase64       
  FROM  students
`

//-------------------------------------------------------------------------------------------
function convertBirthDates(studentData) {
  console.log(`convertBithDates`);
  if (Array.isArray(studentData)) {
    studentData.forEach((studentFields) => {
      const dateObject = new Date(studentFields.birthDate);
      studentFields.birthDate = formatDisplayDate(dateObject);
    })  
  } else {
    const dateObject = new Date(studentData.birthDate);
    studentData.birthDate = formatDisplayDate(dateObject);
  }
}

//-------------------------------------------------------------------------------------------
// 1. get multiple students for display on the list 
// 2. get empty student fields for dislpay on the create 
// 3. get specific student fields for editing   
//-------------------------------------------------------------------------------------------
function searchStudents(searchData) {
  console.log(`searchStudentData : searchData -> ${JSON.stringify(searchData)}`);
  try {
    if ('editMode' in searchData) {
      if (searchData.editMode.isCreating) {
        return getEmptyStudentFields();
      } else {
        return getStudentFieldsByBadge(searchData.searchFields);
      }    
    } else {
      return searchStudentDataByName(searchData);
    }
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}

//-------------------------------------------------------------------------------------------
function getEmptyStudentFields() {
  console.log(`getEmptyStudentFields`);
  try {
    const whereClause = `
      where    badgeNumber = -1
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt + whereClause);
    const rows         = searchStmt.get();
    db.close();
    convertBirthDates(rows);
    return rows;
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}

//-------------------------------------------------------------------------------------------
// Support the search screen 
//-------------------------------------------------------------------------------------------
function searchStudentDataByName(searchData) {
  console.log(`searchStudentDataByName : searchData -> ${JSON.stringify(searchData)}`);
  try {
    const whereClause = `
      where  lower(firstName)   like :firstName
      and    lower(lastName)    like :lastName
      and    badgeNumber        > 0
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt + whereClause);
    const rows         = searchStmt.all({
      'firstName' : searchData.firstName.toLowerCase() + '%', 
      'lastName'  : searchData.lastName.toLowerCase()  + '%'
    });
    db.close();
    convertBirthDates(rows);
    return rows;
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}


//-------------------------------------------------------------------------------------------
// Support the edit screen 
//-------------------------------------------------------------------------------------------
function getStudentFieldsByBadge(searchData) {
  console.log(`getStudentDataByName : searchData -> ${JSON.stringify(searchData)}`);
  try {
    const whereClause = `
      where  badgeNumber    = :badgeNumber
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt + whereClause);
    const row          = searchStmt.get({
      'badgeNumber' : searchData.badgeNumber 
    });
    db.close();
    convertBirthDates(row);
    return row;
  } catch (err) {
    console.error('Error searching by name: ', err); throw err; 
  } 
}

//-------------------------------------------------------------------------------------------
// Support the edit screen 
//-------------------------------------------------------------------------------------------
function getStudentDataByName(searchData) {
  console.log(`getStudentDataByName : searchData -> ${JSON.stringify(searchData)}`);
  try {
    const whereClause = `
      where  lower(firstName)   = :firstName
      and    lower(lastName)    = :lastName
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt + whereClause);
    const rows         = searchStmt.all({
      'firstName' : searchData.firstName.toLowerCase(), 
      'lastName'  : searchData.lastName.toLowerCase()
    });
    db.close();
    convertBirthDates(rows);
    return rows;
  } catch (err) {
    console.error('Error searching by name: ', err); throw err; 
  } 
}


module.exports = {
  //countStudentsByName,
  searchStudents,
  getStudentDataByName,
  searchStudentDataByName, 
  //getStudentFieldsByBadge
}