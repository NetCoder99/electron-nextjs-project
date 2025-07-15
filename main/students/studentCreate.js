// ----------------------------------------------------------
const appRoot  = require('app-root-path');
const path     = require('node:path')  
const rootPath = appRoot.path;

// ----------------------------------------------------------
// const validate_path           = path.join(rootPath, 'src', 'data', 'student_validate_create.js');
// const validateStudentObj      = require(validate_path);

// const studentProcsPath        = path.join(rootPath, 'src', 'data', 'student_data_procs.js');
// const {getNewBadgeNumber}     = require(studentProcsPath);
// const {insertStudent}         = require(studentProcsPath);
// const {savePictureData}       = require(studentProcsPath);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function isFieldNull(inpField) {
  if (inpField == null || (typeof inpField === 'string' && inpField.trim().length === 0)) {
    return true;
  }  
  else {
    return false;
  }
}

//---------------------------------------------------------------
function validateCreateStudentFields(studentData) {
  try {
    studentData.saveMessage = null;
    studentData.saveResult  = 'text-success';

    if (isFieldNull(studentData.firstName) ) {
      studentData.firstNameClass = 'invalid';
      studentData.saveResult     = 'text-danger';
      if (isFieldNull(studentData.saveMessage)) {
        studentData.saveMessage = "First name is required";
      }
    } else {
      studentData.firstNameClass = 'valid';
    }


    if (isFieldNull(studentData.lastName) ) {
      studentData.lastNameClass = 'invalid';
      studentData.saveResult     = 'text-danger';
      if (isFieldNull(studentData.saveMessage)) {
        studentData.saveMessage = "Last name is required";
      }
    } else {
      studentData.lastNameClass = 'valid';
    }

    if (isFieldNull(studentData.birthDate) ) {
      studentData.birthDateClass = 'invalid';
      studentData.saveResult     = 'text-danger';
      if (isFieldNull(studentData.saveMessage)) {
        studentData.saveMessage = "Birth date is required";
      }
    } else {
      studentData.birthDateClass = 'valid';
    }

    console.log(`validateCreateStudentFields: ${JSON.stringify(studentData)}`);
    
    return studentData;
  } catch(err) {
    console.log(`validateCreateStudentFields failed: ${JSON.stringify(studentData)}`);
    result = {'status': 'err', 'msg' : err.toString()}
    return studentData;
  }
}


  //---------------------------------------------------------------
  //const studentProcsPath        = path.join(__dirname, 'studentProcs');
  const {searchStudentDataByName} = require(path.join(__dirname, 'studentProcs'));
  function createStudentRecord(studentData) {
  try {
    // check the required fields have been filled in 
    console.log(`createStudentRecord: ${JSON.stringify(studentData)}`);
    studentDataResults = validateCreateStudentFields(studentData);
    console.log(`studentDataResults: ${JSON.stringify(studentDataResults)}`);

    if (studentDataResults.saveResult != 'text-success') {
      return studentDataResults;
    }

    // const studentProcsPath        = path.join(rootPath, 'src', 'data', 'student_data_procs.js');
    const searchResults =  searchStudentDataByName(studentDataResults);
    console.log(`searchResults: ${JSON.stringify(searchResults)}`);
    if (searchResults.length > 0) {
      studentDataResults.firstNameClass = 'invalid';
      studentDataResults.lastNameClass  = 'invalid';
      studentDataResults.saveResult     = 'text-danger';
      studentDataResults.saveMessage    = "Student Record already exists.";
      return studentDataResults;
    }

    return studentDataResults;

    // check the first name and last name do not already exist 

    // createValidResults = validateStudentObj.validateStudentDataCreate(studentData);
    // if (createValidResults.overall.status == 'err') {
    //   studentView.webContents.send('createNewStudentResult', createValidResults);
    //   return;
    // }

    // const badgeNumber = getNewBadgeNumber().badgeNumber;
    // studentData.badgeNumber = badgeNumber;
    // insertStudent(studentData);
    
    // const imageBase64 = studentData.studentPicture.split(",")[1];
    // picureData = {
    //   'imageBuffer' : null,
    //   'imageBase64' : imageBase64,
    //   'imagePath' : null,
    //   'badgeNumber' : badgeNumber,
    // }
    // savePictureData(picureData);

    // results = {'status': 'ok', 'msg' : 'Student record has been added', 'studentData': studentData}
    // setTimeout(() => {
    //   studentView.webContents.send('createNewStudentResult', results);
    // }, 1000);  

  } catch(err) {
    console.log(`searchStudentData failed: ${JSON.stringify(studentData)}`);
    result = {'status': 'err', 'msg' : err.toString()}
    //studentView.webContents.send('createNewStudentResult', result);
    return studentData;
  }
}

module.exports = {createStudentRecord}
