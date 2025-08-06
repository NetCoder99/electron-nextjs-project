const path     = require("path");
//const appRoot  = require('app-root-path');
const sqlite3  = require('better-sqlite3');
const getDatabaseLocationPath = path.join(__dirname, '..', 'data', 'common');
const {getDatabaseLocation} = require(getDatabaseLocationPath);

//---------------------------------------------------------------
const rankPrefix = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th']

//---------------------------------------------------------------
function getBeltNames() {
  const beltsSelectStmt = `
    SELECT beltId, beltTitle, stripeTitle, classCount, imageSource
    FROM belts
    order by beltId;
  `;
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const srchBelts    = db.prepare(beltsSelectStmt);
    const beltRows     = srchBelts.all();
    db.close();
    return beltRows;
  } catch (err) {
    console.error('Error in getBeltNames:', err); 
    throw err; 
  } 
}

//---------------------------------------------------------------
function getRankRequirements() {
  //console.log(`getRankRequirements invoked`);
  const beltsSelectStmt = `
    SELECT beltId, beltTitle, stripeTitle, classCount, imageSource
    FROM belts
    order by beltId;
  `;
  const rqmtsSelectStmt = `
    SELECT requirementId, beltId, stripeTitle, requiredClasses
    FROM   requirements
    where  beltId = :beltId
    order  by beltId, requiredClasses;
  `
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const srchBelts    = db.prepare(beltsSelectStmt);
    const srchRqmts    = db.prepare(rqmtsSelectStmt);
    const beltRows     = srchBelts.all();
    beltRows.forEach((beltRow)  => {
      //console.log(beltRow);
      const rqmtRows   = srchRqmts.all({'beltId': beltRow.beltId});
      beltRow.stripe_names = rqmtRows;
    });
    db.close();
    return beltRows;
  } catch (err) {
    console.error('Error searching by by badge', err); 
    throw err; 
  } 
}

//---------------------------------------------------------------
function addRankRequirement(beltRankDetails) {
    beltRankDetails.stripe_names.forEach(element => {
      console.log(`addRankRequirement: ${JSON.stringify(element)}`);
    });
    const newTitle   = rankPrefix[beltRankDetails.stripe_names.length] + ' ' + beltRankDetails.stripeTitle;
    const newClasses = (beltRankDetails.stripe_names.length+1) * beltRankDetails.classCount;
    //console.log(`newTitle: ${newTitle}`);
    const rqmtsUpdateStmt = `
      INSERT OR REPLACE INTO requirements(beltId, stripeTitle, requiredClasses)
      VALUES(:beltId, :stripeTitle, :requiredClasses)
      returning requirementId;
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const rqmtsUpdate  = db.prepare(rqmtsUpdateStmt);
    const response     = rqmtsUpdate.run(
      {'beltId': beltRankDetails.beltId,'stripeTitle' : newTitle, 'requiredClasses' : newClasses}
    );
    db.close();
    console.log(`insert response: ${JSON.stringify(response)}`);

    beltRankDetails.stripe_names.push({
      "requirementId" : response.lastInsertRowid,
      "beltId": beltRankDetails.beltId, 
      "stripeTitle":newTitle,
      "requiredClasses":newClasses
    });
    return beltRankDetails;

};

//---------------------------------------------------------------
function saveRankRequirement(beltRankDetails) {
  try {
    const rqmtsUpdateStmt = `
      INSERT OR REPLACE INTO requirements(beltId, stripeTitle, requiredClasses)
      VALUES(:beltId, :stripeTitle, :requiredClasses)
      returning requirementId;
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const rqmtsUpdate  = db.prepare(rqmtsUpdateStmt);

    beltRankDetails.stripe_names.forEach(element => {
      console.log(`saveRankRequirement: ${JSON.stringify(element)}`);
      rqmtsUpdate.run({'beltId': element.beltId,'stripeTitle' : element.stripeTitle, 'requiredClasses' : element.requiredClasses});
    });
    db.close();
  } catch (err) {
    console.error('Error searching by by badge', err); 
    throw err; 
  } 
};


function delRankRequirements(requirementId) {
  console.log(`deleting requirementId: ${requirementId}`);
  try {
    const rqmtsDeleteStmt = `
      delete from requirements
      where  requirementId = :requirementId
      returning requirementId;
    `
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const response     = db.prepare(rqmtsDeleteStmt).run({'requirementId': requirementId});
    console.log(`delete response: ${JSON.stringify(response)}`);
    db.close();
    return response;
  } catch (err) {
    console.error('Error searching by by badge', err); 
    throw err; 
  } 
}

module.exports = {
  getBeltNames,
  getRankRequirements, 
  addRankRequirement, 
  saveRankRequirement,
  delRankRequirements
}