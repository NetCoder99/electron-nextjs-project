const path     = require("path");
const appRoot  = require('app-root-path');
const sqlite3  = require('better-sqlite3');
const getDatabaseLocationPath = path.join(__dirname, '..', 'data', 'common');
const {getDatabaseLocation} = require(getDatabaseLocationPath);

const studentFields = {
  'badgeNumber'  : -1,
  'firstName'    : '',
  'lastName'     : '',
  'namePrefix'   : '',
  'email'        : '',
  'address'      : '',
  'address2'     : '',
  'city'         : '',
  'country'      : '',
  'state'        : '',
  'zip'          : '',
  'birthDate'    : '',
  'phoneHome'    : '',
  'phoneMobile'  : '',
  'status'       : '',
  'memberSince'  : '',
  'gender'       : '',
  'currentRank'  : '',
  'ethnicity'    : ''
}


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
       ,imageBase64             as imageBase64
  FROM  students
  where badgeNumber = :badgeNumber
`
function searchStudentData(searchData) {
  console.log(`searchStudentData : searchData -> ${JSON.stringify(searchData)}`);
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(searchStudentStmt);
    const rows          = searchStmt.all({'badgeNumber' : 1609});
    db.close();
    return rows;
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}

module.exports = {
  searchStudentData, 
}