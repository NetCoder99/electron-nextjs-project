//---------------------------------------------------------------
function isFieldNull(inpField) {
  if (inpField == null || (typeof inpField === 'string' && inpField.trim().length === 0)) {
    return true;
  }  
  else {
    return false;
  }
}

//---------------------------------------------------------------
function validateStudentFields(studentData) {
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

module.exports = {
  isFieldNull,
  validateStudentFields
}