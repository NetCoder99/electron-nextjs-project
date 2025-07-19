const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}   = require(path.join(__dirname, '..', 'data', 'common'));

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
         email       = :email
  where  badgeNumber = :badgeNumber;        
`
function updateStudentData(studentData) {
  try {
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
    });
    db.close();
  } catch (err) {
    console.error('Error updating student data', err); throw err; 
  } 
}

module.exports = {updateStudentData}