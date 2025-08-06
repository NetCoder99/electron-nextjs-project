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
`

function GetStudentPromotions(searchData) {
  console.log(`GetStudentPromotions`);
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 

    // const allCheckinBadges = GetAllLastCheckins();
    // for (const checkinRec of allCheckinBadges) {
    //   console.log(JSON.stringify(checkinRec) ); // 1, 2, 3
    // }
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

module.exports = {
  GetAllLastCheckins,
  GetStudentPromotions
}