const fs = require('fs');
const path = require('path');

const deleteFolder = function (dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(function (file) {
      const curPath = path.join(dir, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(path);
  }
};

module.exports = deleteFolder;
