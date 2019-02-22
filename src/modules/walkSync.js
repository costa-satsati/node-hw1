const fs = require('fs');
const path = require('path');

const walkSync = function (dir, done) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    done(err);
  }

  files.forEach(function (file) {
    const sPath = path.join(dir, file);
    if (fs.statSync(sPath).isDirectory()) {
      walkSync(sPath);
    } else {
      console.log(sPath);
    }
  });
};

module.exports = walkSync;
