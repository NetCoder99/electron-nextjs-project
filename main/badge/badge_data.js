const path     = require("path");
const sqlite3  = require('better-sqlite3');
const {getDatabaseLocation}    = require(path.join(__dirname, '..', 'data', 'common'));

const getBadgeDataStr = `
  select badgeNumber            as badgeNumber ,
         firstName              as firstName ,
         lastName               as lastName ,
         'Rising Sun Martial Arts'                               as title1,
         'Building tomorrows leaders, one black belt at a time!' as title2,
         'Birthday: ' || birthDate                  as subField1,
         'Since: '    || memberSince                as subField2,
         '/public/misc_images/RSM_Logo1.jpg'        as schoolLogoPath,
         '/public/badges/' || badgeNumber || '.png' as barcodeImagePath,
         ifnull(studentimageBase64, 
          (select imageBase64 
           from   assets a 
           where  imageName = 'RSM_Logo2.webp'
          ))                                       as studentimageBase64,
         ifnull(studentImageBytes, 
          (select imageBytes
           from   assets a 
           where  imageName = 'RSM_Logo2.webp'
          ))                                       as studentImageBytes       
    from  students 
  where badgeNumber = :badgeNumber
`;

function getBadgeData(badgeNumber) {
  try {
    const db_directory = getDatabaseLocation();
    const db           = new sqlite3(db_directory); 
    const searchStmt   = db.prepare(getBadgeDataStr);
    const row          = searchStmt.get({'badgeNumber':badgeNumber});
    db.close();
    return row;
  } catch (err) {
    console.error('Error searching by by badge', err); throw err; 
  } 
}

//---------------------------------------------------------------
module.exports = {getBadgeData}
