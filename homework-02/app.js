const { task1: sum, task2: earth, task3 } = require('./src/index');

const boot = async () => {
  const result1 = await sum.sum(1, 2, 3);
  console.log(result1);
  const result3 = await task3.setTimeoutPromise(1000, 'done');
  console.log(result3);
  const result2 = await earth.calculateVolume(13);
  console.log(result2);
};

boot();
