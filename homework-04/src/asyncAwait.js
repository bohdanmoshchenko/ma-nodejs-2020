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

async function throwDiceWithDelay(maxValue, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = throwDice(maxValue);
      if (result === 0) {
        reject(new Error('Lost Dice'));
      }
      resolve(result);
    }, delay);
  });
}

const maxValue = 7;
const timeout1 = 700;
const timeout2 = 2000;
const timeout3 = 3000;

async function app() {
  let result3 = 0;
  const result1 = await throwDiceWithDelay(maxValue, timeout1);
  result3 += result1;
  showMessage(result1);
  const result2 = await throwDiceWithDelay(maxValue, timeout2);
  result3 += result2;
  showMessage(result2);
  setTimeout(() => {
    showMessage(result3);
  }, timeout3);
}

app();
