const {dialog} = require('electron/main') 
const path     = require("path");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const resizeImagePath      = path.join(__dirname, '..', 'common', 'scale_image.js');
const {scaleImageToHeight} = require(resizeImagePath);

async function selectStudentPicture(image_src) {  
  console.log(`selectStudentPicture was activated`);
  const imageDetails = {
    'status'       : '',
    'message'      : '',
    'text_style'   : 'h5 text-dark',
    'image_src'    : image_src,
    'image_name'   : null, 
    'image_path'   : null, 
    'image_string' : null
  }
  let filepath = dialog.showOpenDialogSync({ properties: ['openFile'] });
  if (!filepath) {
    imageDetails.status     = 'cancelled';
    imageDetails.message    = 'User cancelled from open file dialog.'
    imageDetails.text_style = 'h5 text-info'
    return imageDetails;
  }
  try {
    const resizedImage = await scaleImageToHeight(filepath[0], null, 300) ;
    const base64String = Buffer.from(resizedImage).toString('base64');
    const parsedPath   = path.parse(filepath[0]);
    imageDetails.image_name   = parsedPath.base;
    imageDetails.image_path   = filepath[0];
    imageDetails.image_string = base64String;
    imageDetails.image_src    = `data:image/jpeg;base64,${base64String}`,
    imageDetails.status      = 'ok';
    imageDetails.message     = `Image selected was ${parsedPath.base}.`
    imageDetails.text_style  = 'h5 text-success'
    return imageDetails;
  }
  catch(err) {
    console.error(err);
    imageDetails.status  = 'error';
    imageDetails.message = err.toString();
    imageDetails.text_style = 'h5 text-danger'
    return imageDetails;
  }  
};

module.exports = {
  selectStudentPicture
}