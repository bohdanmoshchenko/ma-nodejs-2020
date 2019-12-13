function showMessage(msg) {
  console.log(msg);
}

function getRandomInt(maxValue) {
  return Math.floor(Math.random() * Math.floor(maxValue));
}

function throwDice(maxValue) {
  const result = getRandomInt(maxValue);
  return result;
}

const maxValue = 7;
const timeout1 = 700;
const timeout2 = 2000;
const timeout3 = 3000;

function app() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = throwDice(maxValue);
      if (result === 0) {
        reject(new Error('Lost dice'));
      }
      showMessage(result);
      resolve(result);
    }, timeout1);
  })
    .then(result => {
      const result2 = throwDice(maxValue);
      if (result2 === 0) {
        throw new Error('Lost dice');
      }
      setTimeout(() => {
        showMessage(result2);
      }, timeout2);
      return result + result2;
    }, null)
    .then(result3 => {
      setTimeout(() => {
        showMessage(result3);
      }, timeout3);
    }, null)
    .catch(errorMsg => showMessage(errorMsg));
}

app();
