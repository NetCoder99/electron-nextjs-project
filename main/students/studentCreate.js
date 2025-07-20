// // ----------------------------------------------------------
// const appRoot  = require('app-root-path');
// const path     = require('node:path')  
// //const rootPath = appRoot.path;


// // function saveStudentData(studentData) {
// //   try {
// //     if (isFieldNull(studentData.badgeNumber)) {
// //       createStudentRecord(studentData);
// //     } else {
// //       createStudentRecord(studentData);
// //     }

// //   } catch(err) {
// //     //console.log(`searchStudentData failed: ${JSON.stringify(studentData)}`);
// //     console.log(`searchStudentData failed`);
// //     result = {'status': 'err', 'msg' : err.toString()}
// //     //studentView.webContents.send('createNewStudentResult', result);
// //     return studentData;
// //   }
// // }

//   //---------------------------------------------------------------
//   const {searchStudentDataByName} = require(path.join(__dirname, 'studentSearchProcs'));
//   function createStudentRecord(studentData) {
//   try {
//     // check the required fields have been filled in 
//     console.log(`createStudentRecord: ${JSON.stringify(studentData)}`);
//     studentDataResults = validateCreateStudentFields(studentData);
//     console.log(`studentDataResults: ${JSON.stringify(studentDataResults)}`);

//     if (studentDataResults.saveResult != 'text-success') {
//       return studentDataResults;
//     }

//     // const studentProcsPath        = path.join(rootPath, 'src', 'data', 'student_data_procs.js');
//     const searchResults =  searchStudentDataByName(studentDataResults);
//     console.log(`searchResults: ${JSON.stringify(searchResults)}`);
//     if (searchResults.length > 0) {
//       studentDataResults.firstNameClass = 'invalid';
//       studentDataResults.lastNameClass  = 'invalid';
//       studentDataResults.saveResult     = 'text-danger';
//       studentDataResults.saveMessage    = "Student Record already exists.";
//       return studentDataResults;
//     }

//     return studentDataResults;

//     // check the first name and last name do not already exist 

//     // createValidResults = validateStudentObj.validateStudentDataCreate(studentData);
//     // if (createValidResults.overall.status == 'err') {
//     //   studentView.webContents.send('createNewStudentResult', createValidResults);
//     //   return;
//     // }

//     // const badgeNumber = getNewBadgeNumber().badgeNumber;
//     // studentData.badgeNumber = badgeNumber;
//     // insertStudent(studentData);
    
//     // const imageBase64 = studentData.studentPicture.split(",")[1];
//     // picureData = {
//     //   'imageBuffer' : null,
//     //   'imageBase64' : imageBase64,
//     //   'imagePath' : null,
//     //   'badgeNumber' : badgeNumber,
//     // }
//     // savePictureData(picureData);

//     // results = {'status': 'ok', 'msg' : 'Student record has been added', 'studentData': studentData}
//     // setTimeout(() => {
//     //   studentView.webContents.send('createNewStudentResult', results);
//     // }, 1000);  

//   } catch(err) {
//     console.log(`searchStudentData failed: ${JSON.stringify(studentData)}`);
//     result = {'status': 'err', 'msg' : err.toString()}
//     //studentView.webContents.send('createNewStudentResult', result);
//     return studentData;
//   }
// }

// module.exports = {createStudentRecord}
