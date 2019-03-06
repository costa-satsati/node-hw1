const fs = require('mz/fs');
const path = require('path');

const walk = async (dir, callback) => {
  let files;
  try {
    files = fs.readdirSync(dir);
    await Promise.all(files.map(async (file) => {
      const sPath = path.join(dir, file);
      const stat = await fs.stat(sPath);
      if (stat.isDirectory()) {
        await walk(sPath, callback);
      } else {
        await callback(sPath);
      }
    }));
  } catch (err) {
    console.log(err);
  }
};

module.exports = walk;
