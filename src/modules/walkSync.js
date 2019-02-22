const fs = require('fs');
const path = require('path');

const walkSync = function (dir, done, callback) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    // done(err);
  }

  files.forEach(function (file) {
    const sPath = path.join(dir, file);
    if (fs.statSync(sPath).isDirectory()) {
      walkSync(sPath, done, callback);
    } else {
      callback(sPath);
    }
  });
  // call done after file copy complete
  done();
};

module.exports = walkSync;
