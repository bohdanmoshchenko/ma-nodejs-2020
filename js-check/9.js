function setTimeoutPromise(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve("done"), milliseconds);
    });
}

setTimeoutPromise(1000);