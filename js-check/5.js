const data = "21345A67098";

for (let i = 0; i <= data.length; i++) {
  let char = Number(data[i]);
  if (typeof char === "number" && char !== 0 && char % 2 === 0) {
    console.log(char);
  }
}
