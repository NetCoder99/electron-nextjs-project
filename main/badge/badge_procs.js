const PDFWindow = require('electron-pdf-window');
const appRoot   = require('app-root-path');
const path      = require('node:path');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const {generateBarcodeImage}   = require(path.join(__dirname, 'barcode_generator'));
const {createBadgePdf}         = require(path.join(__dirname, 'badge_generator'));
const {getBadgeData}           = require(path.join(__dirname, 'badge_data.js'));

// ------------------------------------------------------------
function createStudentBadge (studentData) {
  //console.log(`generateBadge was clicked: ${JSON.stringify(studentData)}`);
  console.log(`generateBadge was clicked`);
  if (!studentData.badgeNumber) {
    return {'error' : 'Badge number is required.'}
  } else {
    const barcodeImagePath = generateBarcodeImage(studentData.badgeNumber);
    const studentBadgeData = getBadgeData(studentData.badgeNumber);
    createBadgePdf(studentBadgeData, doneWritingPdf);
  }
}

// ------------------------------------------------------------
function doneWritingPdf(badgeNumber) {
  console.log(`doneWritingPdf is creating pdf window: ${badgeNumber}`);
  const pdfWindow = new PDFWindow({
    width: 1200,
    height: 800,
    webPreferences: { }
  });
  pdfPath = appRoot + `/public/badges/${badgeNumber}.pdf`;
  pdfWindow.loadFile(pdfPath);
}

// // ------------------------------------------------------------
// function formatDispayDate(dateValue) {
//   let day    = ("0" + dateValue.getDate()).slice(-2);
//   let month  = ("0" + (dateValue.getMonth() + 1)).slice(-2);
//   let year   = dateValue.getFullYear();
//   return day + "/" + month + "/" + year;
// }

module.exports = {createStudentBadge}