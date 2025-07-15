const path     = require("path");
const sqlite3  = require('better-sqlite3');
const getDatabaseLocationPath = path.join(__dirname, '..', 'data', 'common');
const {getDatabaseLocation}   = require(getDatabaseLocationPath);

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
       ,studentImage            as studentImage
       ,ifnull(imageBase64, 
        (select imageBase64 
         from assets a 
         where imageName = 'RSM_Logo2.webp'
         ))             as imageBase64       
  FROM  students
`
//-------------------------------------------------------------------------------------------
function searchStudentDataByBadge(searchData) {
  console.log(`searchStudentData : searchData -> ${JSON.stringify(searchData)}`);
  const whereClause = `
    where  badgeNumber = :badgeNumber'
  `
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt + whereClause);
    const rows         = searchStmt.all({'badgeNumber' : 1609});
    db.close();
    return rows;
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}

//-------------------------------------------------------------------------------------------
function countStudentsByName(searchData, useLike=false) {
  console.log(`searchStudentData : searchData -> ${JSON.stringify(searchData)}`);
  try {
    const whereClause = `
      where  lower(firstName)   = lower(:firstName)
      and    lower(lastName)    = lower(:lastName)
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt + whereClause);
    const rows         = searchStmt.all({
      'firstName'  : searchData.firstName.toLowerCase(), 
      'lastName'   : searchData.lastName.toLowerCase()
    });
    db.close();
    return rows;
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}

//-------------------------------------------------------------------------------------------
function searchStudentDataByName(searchData) {
  console.log(`searchStudentDataByName : searchData -> ${JSON.stringify(searchData)}`);
  try {
    const whereClause = `
      where  lower(firstName)   like :firstName
      and    lower(lastName)    like :lastName
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt + whereClause);
    const rows         = searchStmt.all({
      'firstName' : searchData.firstName.toLowerCase() + '%', 
      'lastName'  : searchData.lastName.toLowerCase()  + '%'
    });
    db.close();
    return rows;
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}

module.exports = {
  countStudentsByName,
  searchStudentDataByBadge,
  searchStudentDataByName, 
}