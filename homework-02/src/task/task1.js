/* eslint-disable no-constant-condition */
/* eslint-disable no-shadow */

function sum(a, b, c) {
  const MY_NUMBER = a; // - 1;
  let myNumber = b; // 0;
  let number = c; // 3;
  if (true) {
    const MY_NUMBER = 1;
    myNumber = 2;
    number = 6;
  }
  return MY_NUMBER + myNumber + number;
}

module.exports.sum = sum(-1, 0, 3);
