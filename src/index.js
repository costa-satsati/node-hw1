const walk = require('./modules/walkSync');

const sourceFolder = process.argv[2];
walk(sourceFolder);
