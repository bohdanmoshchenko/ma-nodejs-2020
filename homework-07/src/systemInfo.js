const os = require('os');

const fixedDigitsAfterZero = 3;

function byteToMegabyte(bytes) {
  return (bytes / 1024 / 1024).toFixed(fixedDigitsAfterZero);
}

function getTotalMemory() {
  return byteToMegabyte(os.totalmem());
}

function getFreeMemory() {
  return byteToMegabyte(os.freemem());
}

function getAllocatedMemory() {
  return getTotalMemory() - getFreeMemory();
}

module.exports = {
  getTotalMemory,
  getFreeMemory,
  getAllocatedMemory,
};
