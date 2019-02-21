const fs = require('fs');
const path = require('path');

const walkSync = function (dir) {
  const files = fs.readdirSync(dir);

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
