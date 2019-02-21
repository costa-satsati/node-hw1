const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'hello.txt'), 'Hello world!', err => {
  if (err) {
    console.log('Error write to file!');
  }
});
