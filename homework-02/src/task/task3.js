function setTimeoutPromise(milliseconds, text) {
  return new Promise(resolve => {
    setTimeout(() => resolve(text), milliseconds);
  });
}

module.exports.setTimeoutPromise = setTimeoutPromise(2000, 'Done!');
