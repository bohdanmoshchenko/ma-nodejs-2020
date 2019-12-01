function isPrime(number) {
  if (number < 2) {
    return false;
  }
  for (let index = 2; index < number; index++) {
    if (number % index === 0) {
      false;
    }
  }
  return true;
}

function generatePrimeNumbersWithDelay(delay) {
  let i = 2;
  let currentPrimeNumber = i;
  setInterval(
    console.log(
      new Date() + "--Biggest prime number found: " + currentPrimeNumber
    ),
    delay
  );
  while (true) {
    if (isPrime(i)) {
      currentPrimeNumber = i;
    }
    i++;
  }
}

const delay = 1000;
generatePrimeNumbersWithDelay(delay);
