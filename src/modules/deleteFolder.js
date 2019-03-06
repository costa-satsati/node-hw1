const fs = require('mz/fs');
const path = require('path');

const deleteFolder = async (dir) => {
  try {
    const files = await fs.readdir(dir);
    await Promise.all(files.map(async (file) => {
      try {
        const p = path.join(dir, file);
        const stat = await fs.lstat(p);
        if (stat.isDirectory()) {
          await deleteFolder(p);
        } else {
          await fs.unlink(p);
          console.log(`Removed file ${p}`);
        }
      } catch (err) {
        console.error(err);
      }
    }));
    await fs.rmdir(dir);
    console.log(`Removed dir ${dir}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = deleteFolder;
