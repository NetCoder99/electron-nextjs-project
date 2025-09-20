function isStartTimeValid(strStartTime) {
  if (strStartTime === null || strStartTime === "") {
    return {'status': false, 'message' : 'Error: Start time is required!'};
  }
  const pattern1 = /^[1]?[0-9]:[0-5][0-9] (AM|PM)/;
  console.log(`isStartTimeValid: ${pattern1.test(strStartTime)} `); 
  if (!pattern1.test(strStartTime)) {
    return {'status': false, 'message' : 'Error: Start time format is not valid!'};
  }
  return {'status': true, 'message' : 'Start time format is valid.'};
}

function isClassDurationValid(classDuration) {
  if (classDuration === null || classDuration === "") {
    return {'status': false, 'message' : 'Error: Class duration is required!'};
  }
  const pattern1 = /^\d+$/;
  if (!pattern1.test(classDuration)) {
    return {'status': false, 'message' : 'Error: Class duration must be a humber!'};
  }
  if (parseInt(classDuration) < 11 || parseInt(classDuration) > 121) {
    return {'status': false, 'message' : 'Error: Class duration must be between 10 and 120 minutes!'};
  }
  return {'status': true, 'message' : 'Class duration is valid.'};
}


function calcClassEndTime(strStartTime, classDuration) {
  console.log(`calcClassEndTime`); 
  if (isStartTimeValid(strStartTime).status && isClassDurationValid(classDuration).status) {
    let dateObject = new Date(timeStampToDate(strStartTime));
    dateObject.setMinutes(dateObject.getMinutes() + classDuration);
    console.log(`calcClassEndTime:timestamp:${dateObject.getHours()}:${dateObject.getMinutes()}`);
    return timeStampDisplay(dateObject);
  }
}

function timeStampToDate(timeString ) {
  const now        = new Date();
  const year       = now.getFullYear();
  const month      = now.getMonth();
  const day        = now.getDate();
  const fullDateTimeString = `${year}-${month + 1}-${day} ${timeString}`;
  const dateObject = new Date(fullDateTimeString);
  return dateObject;
}

function timeStampDisplay(dateObject) {
  if (dateObject.getHours() > 12) {
    return (  dateObject.getHours() - 12).toString() 
            + ":" 
            + dateObject.getMinutes()
            + " PM";
  } else {
    return (  dateObject.getHours()).toString() 
            + ":" 
            + dateObject.getMinutes()
            + " AM";
  }
} 

function parseTime(timeString) {
  const [hours, minutes, seconds = 0] = timeString.split(':').map(Number);
  const now = new Date(); // Or new Date(0) for a fixed date
  now.setHours(hours, minutes, seconds);
  return now;
}

module.exports = {
  isStartTimeValid,
  isClassDurationValid, 
  calcClassEndTime
}