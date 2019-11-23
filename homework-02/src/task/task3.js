/* eslint-disable func-names */
function setTimeoutPromise(milliseconds, text) {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(text), milliseconds);
  });
}

module.exports = {
  setTimeoutPromise,
};
