const fs = require('fs');
const path = require('path');
const walk = require('./modules/walkSync');
const deleteFolder = require('./modules/deleteFolder');

const sourceFolder = process.argv[2];
const outputFolder = process.argv[3];
const isShouldRemoveInputFolder = process.argv[4];

// Checks if the folder exists, if not creates it
const checkOrCreateFolder = function (dirName) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};

// This is called after copying is complete
const done = function (err) {
  if (err) throw err;
  console.log('Files sorted and copied!');

  if (isShouldRemoveInputFolder) {
    deleteFolder(sourceFolder);
    console.log('Source folder deleted!');
  }
};

const callback = function (filePath) {
  const fileName = path.basename(filePath);
  const folderName = fileName[0].toUpperCase();
  const newFilePath = path.resolve(outputFolder, `./${folderName}/${fileName}`);

  checkOrCreateFolder(path.resolve(outputFolder, `./${folderName}`));
  fs.copyFile(filePath, path.resolve(outputFolder, newFilePath), (err) => {
    if (err) throw err;
  });
};

// Check input params
if (!sourceFolder || !outputFolder) {
  throw new Error('Source and destination folder names are required!');
} else {
  checkOrCreateFolder(outputFolder);
}

walk(sourceFolder, done, callback);
