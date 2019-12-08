function showMessage(msg) {
  console.log(msg);
}

function getRandomInt(maxValue) {
  return Math.floor(Math.random() * Math.floor(maxValue));
}

function throwDice(maxValue, callback) {
  const result = getRandomInt(maxValue);
  if (result === 0) {
    throw new Error('Lost Dice');
  }
  showMessage(result);
  callback(result);
}

const maxValue = 7;
const timeout1 = 700;
const timeout2 = 2000;
const timeout3 = 3000;

function app() {
  let result = 0;
  setTimeout(() => {
    throwDice(maxValue, value => {
      result += value;
      setTimeout(() => {
        throwDice(maxValue, value => {
          result += value;
          setTimeout(() => {
            showMessage(result);
          }, 3000);
        });
      }, 2000);
    });
  }, 700);
}

app();
