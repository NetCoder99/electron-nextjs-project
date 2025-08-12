const path     = require("path");
const sqlite3  = require('better-sqlite3');
const getDatabaseLocationPath = path.join(__dirname, '..', 'data', 'common');
const {getDatabaseLocation} = require(getDatabaseLocationPath);

const GetAllLastCheckinsStmt =  `
  select badgeNumber,
        max(checkinDateTime) as lastCheckIn,
        max(studentName) as studentName,
        count(*) as checkinCount
  from   attendance a
  group  by badgeNumber 
  order  by badgeNumber 
`
//-------------------------------------------------------------------------------------------
// Support the promotions inititialize function
//-------------------------------------------------------------------------------------------
function GetAllLastCheckins() {
  console.log(`GetAllLastCheckins`);
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(GetAllLastCheckinsStmt);
    const rows         = searchStmt.all();
    db.close();
    return rows;
  } catch (err) {
    console.error('Error searching by name: ', err); throw err; 
  } 
}



const GetStudentPromotionsStmt = `
  with cte_ranks_by_student as (
    select badgeNumber, rankName, max(checkinDateTime) as checkinDateTime 
    from   attendance a 
    where  badgeNumber      = :badgeNumber
    and    length(rankName) > 0
    group  by rankName 
    order  by checkinDateTime  desc
  )
  select c1.badgeNumber,
         c1.rankName, 
         c1.checkinDateTime,
         (select b1.beltId 
          from   belts   b1
          where  instr(c1.rankName, b1.beltTitle) > 0 ) as beltId
  from   cte_ranks_by_student  c1
  where  beltId is not null  
`


function GetStudentPromotions(searchData) {
  console.log(`GetStudentPromotions`);
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    if (!searchData.badgeNumber) {
      return [{
        'badgeNumber' : '',
        'rankName' : '',
        'checkinDateTime' : '',
        'beltId' : -1,
      }]
    };
    const searchStmt   = db.prepare(GetStudentPromotionsStmt);
    const rows         = searchStmt.all({'badgeNumber' : searchData.badgeNumber});
    db.close();
    return rows;
  } catch (err) {
    console.error('Error in GetStudentPromotions', err); 
    throw err; 
  } 
}

// -------------------------------------------------------------------------------
const GetStudentPromotionsStmtV2 = `
  select attd.attendanceRankName             as rankName, 
         attd.attendanceRankNum              as rankNum, 
         attd.attendanceStudentName          as studentName,  
         attd.attendanceScannedNum           as badgeNumber,
         max(attd.attendanceCheckinDateTime) as checkinDateTime,
         count(*)                            as classCount
  from   attendance_import   attd
  where  attd.badgeNumber                  = :badgeNumber
  and    length(attd.attendanceRankName)   > 1
  and    attd.attendanceRankName           like '%Belt' 
  group  by attd.attendanceRankName, 
            attd.attendanceRankNum, 
            attd.attendanceStudentName, 
            attd.attendanceScannedNum
  order  by CAST(attd.attendanceRankNum AS INTEGER)
`
function GetStudentPromotionsV2(searchData) {
  console.log(`GetStudentPromotions`);
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    if (!searchData.badgeNumber) {
      return [{
        'badgeNumber' : '',
        'rankName' : '',
        'checkinDateTime' : '',
        'beltId' : -1,
      }]
    };
    const searchStmt   = db.prepare(GetStudentPromotionsStmtV2);
    const rows         = searchStmt.all({'badgeNumber' : searchData.badgeNumber});
    db.close();
    return rows;
  } catch (err) {
    console.error('Error in GetStudentPromotions', err); 
    throw err; 
  } 
}


module.exports = {
  GetAllLastCheckins,
  GetStudentPromotions,
  GetStudentPromotionsV2
}