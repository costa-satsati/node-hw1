const fs = require('fs');
const walk = require('./modules/walkSync');

const sourceFolder = process.argv[2];
const outputFolder = process.argv[3];

// Checks if the folder exists, if not creates it
const checkOrCreateFolder = function (dirName) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};

// Check input params
if (!sourceFolder || !outputFolder) {
  throw new Error('Source and destination folder names are required!');
} else {
  checkOrCreateFolder(outputFolder);
}

walk(sourceFolder);
