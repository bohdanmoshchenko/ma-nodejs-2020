const os = require('os');

const processEnv = process.env;

let rate = Number(processEnv.RATE) || 1000;
let limit = Number(processEnv.LIMIT) || 300;
let color = processEnv.COLOR === 'true';
if (processEnv.COLOR === undefined) {
  color = true;
}

const fixedDigitsAfterZero = 3;

let previousMemoryDelta = 0;

function showInConsoleInInfinityLoopWithTimeOut(showMessage, timeout) {
  setInterval(() => {
    console.clear();
    showMessage();
  }, timeout);
}

function byteToMegabyte(bytes) {
  return (bytes / 1024 / 1024).toFixed(fixedDigitsAfterZero);
}

function showMemStatisticMessage() {
  const totalMemory = byteToMegabyte(os.totalmem());
  const freeMemory = byteToMegabyte(os.freemem());
  const allocatedMemory = (totalMemory - freeMemory).toFixed(fixedDigitsAfterZero);
  const currentMemoryDelta = allocatedMemory;
  const memoryDelta = (currentMemoryDelta - previousMemoryDelta).toFixed(fixedDigitsAfterZero);
  previousMemoryDelta = currentMemoryDelta;

  const defaultColorTemplate = '%s\x1b[m%s\x1b[0m';
  const redColorTemplate = '%s\x1b[31m%s\x1b[0m';
  const greenColorTemplate = '%s\x1b[32m%s\x1b[0m';

  let colorTemplate = defaultColorTemplate;

  console.log('Total system memory: ', totalMemory);

  if (color === true) {
    if (freeMemory < limit) {
      colorTemplate = redColorTemplate;
    } else {
      colorTemplate = defaultColorTemplate;
    }
  }

  console.log(colorTemplate, 'Free memory available: ', freeMemory);
  console.log(`Allocated memory: ${allocatedMemory}`);

  if (color === true) {
    if (memoryDelta < 0) {
      colorTemplate = redColorTemplate;
    } else if (memoryDelta > 0) {
      colorTemplate = greenColorTemplate;
    }
  }
  console.log(colorTemplate, 'Delta for previous allocated memory value: ', memoryDelta);

  if (color === true) {
    if (freeMemory < limit) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        '!!! ATTENTION: Available memory is under the defined limit !!!',
      );
    }
  }
}

function app() {
  const processArgs = process.argv.slice(2);
  processArgs.forEach(element => {
    const paramValue = element.replace('--', '').split('=');
    // eslint-disable-next-line default-case
    switch (paramValue[0].toLowerCase()) {
      case 'rate':
        try {
          rate = Number(paramValue[1]) || rate;
          // eslint-disable-next-line no-empty
        } catch (error) {}
        break;
      case 'limit':
        try {
          limit = Number(paramValue[1]) || limit;
          // eslint-disable-next-line no-empty
        } catch (error) {}
        break;
      case 'color':
        try {
          color = Boolean(paramValue[1]) || color;
          // eslint-disable-next-line no-empty
        } catch (error) {}
        break;
    }
  });
  showInConsoleInInfinityLoopWithTimeOut(showMemStatisticMessage, rate);
}

module.exports = { app };
