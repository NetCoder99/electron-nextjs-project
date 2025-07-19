const {dialog} = require('electron/main') 
const path     = require("path");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const resizeImagePath      = path.join(__dirname, '..', 'common', 'scale_image.js');
const {scaleImageToHeight} = require(resizeImagePath);
const {splitFilename}      = require(path.join(__dirname, '..', 'common', 'string_procs.js'));

function getImageType(image_name) {
  const nameParts   = splitFilename(image_name);
  const image_extn  = nameParts.extension;
  if (image_extn.toLowerCase() === 'JPG'.toLowerCase())  {return 'jpeg';}
  if (image_extn.toLowerCase() === 'PNG'.toLowerCase())  {return 'png';}
  if (image_extn.toLowerCase() === 'GIF'.toLowerCase())  {return 'gif';}
  if (image_extn.toLowerCase() === 'SVG'.toLowerCase())  {return 'svg+xml';}
  if (image_extn.toLowerCase() === 'webp'.toLowerCase()) {return 'webp';}
  if (image_extn.toLowerCase() === 'BMP'.toLowerCase())  {return 'bmpl';}
  return '';
}

async function selectStudentPicture(image_src) {  
  console.log(`selectStudentPicture was activated`);
  const imageDetails = {
    'status'       : '',
    'message'      : '',
    'text_style'   : 'h5 text-dark',
    'image_src'    : image_src,
    'image_name'   : null, 
    'image_type'   : null, 
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
    imageDetails.image_type   = getImageType(imageDetails.image_name);
    imageDetails.image_path   = filepath[0];
    imageDetails.image_string = base64String;
    imageDetails.image_src    = `data:image/${imageDetails.image_type};base64,${base64String}`,
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