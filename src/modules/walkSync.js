const fs = require('fs');
const path = require('path');

const walkSync = function (dir, callback) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    // done(err);
  }

  files.forEach(function (file) {
    const sPath = path.join(dir, file);
    if (fs.statSync(sPath).isDirectory()) {
      walkSync(sPath, callback);
    } else {
      callback(sPath);
    }
  });
};

module.exports = walkSync;
