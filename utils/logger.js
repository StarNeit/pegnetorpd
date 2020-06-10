const moment = require('moment');

const MOMENT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module.exports = {
  error: (string, level = 0) => {
    let spaces = '  ';
    for (let i = 0; i < level; i++) {
      spaces += '  ';
    }

    console.error(`${spaces}--x-- [${moment().format(MOMENT_FORMAT)}] ${string}`);
  },

  log: (string, level = 0) => {
    let spaces = '  ';
    for (let i = 0; i < level; i++) {
      spaces += '  ';
    }

    console.log(`${spaces}----- [${moment().format(MOMENT_FORMAT)}] ${string}`);
  },

  waitFor: (delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }
};
