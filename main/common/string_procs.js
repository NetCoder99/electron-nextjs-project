function splitFilename(filename) {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
    // No extension found
    return { name: filename, extension: '' };
  } else {
    const name = filename.substring(0, lastDotIndex);
    const extension = filename.substring(lastDotIndex + 1);
    return { name, extension };
  }
}

module.exports = {splitFilename}