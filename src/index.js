const fs = require('mz/fs');
const path = require('path');
const walk = require('./modules/walk');
const deleteFolder = require('./modules/deleteFolder');

const sourceFolder = process.argv[2];
const outputFolder = process.argv[3];
const isShouldRemoveInputFolder = process.argv[4];

// Checks if the folder exists, if not creates it
const checkOrCreateFolder = async (dirName) => {
  if (!await fs.exists(dirName)) {
    await fs.mkdir(dirName);
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

const callback = async (filePath) => {
  const fileName = path.basename(filePath);
  const folderName = fileName[0].toUpperCase();
  const newFilePath = path.resolve(outputFolder, `./${folderName}/${fileName}`);
  try {
    await checkOrCreateFolder(path.resolve(outputFolder, `./${folderName}`));
    await fs.copyFile(filePath, path.resolve(outputFolder, newFilePath));
  } catch (err) {
    console.log(err);
  }
};

// Check input params
if (!sourceFolder || !outputFolder) {
  throw new Error('Source and destination folder names are required!');
} else {
  checkOrCreateFolder(outputFolder);
}

walk(sourceFolder, callback).then(() => done());
