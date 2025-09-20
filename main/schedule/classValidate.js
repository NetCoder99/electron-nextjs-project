const  path    = require("path");

//---------------------------------------------------------------
// 1. Class Name is required
// 2. Class Name should not already exist
// 3. Style Number is required
// 4. Day of week is required and must be between 0 and 6
// 5. Start time is required and must be formatted as HH:MM AM/PM
// 6. Call duration is required and must by a number
// 7. Allowed ranks is required and at least one must be selected
// 8. Class date and time must not over lap any other class
//---------------------------------------------------------------


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
function validateClassFields(classData) {
  try {
    classData.focusField  = null;
    classData.saveMessage = null;
    classData.saveResult  = 'text-success';
    classData.validity    = 'ok';

    validateClassName     (classData);
    validateStartTime     (classData);
    validateClassDuration (classData);
    validateBeltsAllowed  (classData);

    if (isFieldNull(classData.saveMessage)) {
      classData.saveMessage = 'No errors detected.';
    }
    console.log(`validateClassFields: ${JSON.stringify(classData)}`);
    return classData;
  } catch(err) {
    classData.validity       = 'err';
    classData.classNameClass = 'invalid';
    classData.saveResult     = 'text-danger';
    classData.saveMessage    = err.toString();    
    console.log(`validateClassFields failed: ${JSON.stringify(classData)}`);
    return classData;
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function validateClassName(classData) {
  if (isFieldNull(classData.className) ) {
    classData.validity       = 'err';
    classData.classNameClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'className';
      classData.saveMessage = "Error: Class name is required";
    }
  } else if (classAlreadyExists(classData.className)) {
    classData.validity       = 'err';
    classData.classNameClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'className';
      classData.saveMessage = "Error: Class name already exists.";
    }
  } else {
    classData.classNameClass = 'valid';
  }
}
const {getClassDetailsByName}      = require(path.join(__dirname, 'classQueries'));
function classAlreadyExists(className) {
  const classDetails = getClassDetailsByName(className);
  if (classDetails == null) { return false; }
  else {return true; }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const {checkForClassOverlap}      = require(path.join(__dirname, 'classQueries'));
function validateStartTime(classData) {
  const pattern = /^[1]?[0-9]:[0-5][0-9] (AM|PM)/;
  if (isFieldNull(classData.startTime) ) {
    classData.validity       = 'err';
    classData.startTimeClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'className';
      classData.saveMessage = "Error: Start time is required";
    }
  } else if (!pattern.test(classData.startTime)) {
    classData.validity       = 'err';
    classData.startTimeClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'className';
      classData.saveMessage = "Error: Start time format is not valid!";
    }
  } else if (checkForClassOverlap(classData).isOverlapping === 'true') {
    classData.validity       = 'err';
    classData.startTimeClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'className';
      classData.saveMessage = "Error: Start time overlaps another class!";
    }
  } else {
    classData.startTimeClass = 'valid';
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function validateClassDuration(classData) {
  const pattern = /^\d+$/;
  if (isFieldNull(classData.classDuration) ) {
    classData.validity       = 'err';
    classData.classDurationClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'classDuration';
      classData.saveMessage = "Error: Class duration is required";
    }
  } else if (!pattern.test(classData.classDuration)) {
    classData.validity       = 'err';
    classData.classDurationClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'className';
      classData.saveMessage = "Error: Class duration must be a number!";
    }
  } else if (parseInt(classData.classDuration) < 11 || parseInt(classData.classDuration) > 121) {
    classData.validity       = 'err';
    classData.classDurationClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'className';
      classData.saveMessage = "Error: Class duration must be between 10 and 120 minutes!";
    }
  } else {
    classData.classDurationClass = 'valid';
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function validateBeltsAllowed(classData) {
  if (classData.allowedRanks.length === 0) {
    classData.validity       = 'err';
    classData.allowedRanksClass = 'invalid';
    classData.saveResult     = 'text-danger';
    if (isFieldNull(classData.saveMessage)) {
      classData.focusField  = 'allowedRanks';
      classData.saveMessage = "Error: At least one belt rank is required";
    }
  } else {
    classData.allowedRanksClass = 'valid';
  }
}

module.exports = {
  isFieldNull,
  validateClassFields,
  validateStartTime
}