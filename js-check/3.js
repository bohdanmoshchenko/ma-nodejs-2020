let text = "Hello World!";
for (let index = 0; index < text.length; index++) {
  char = text[index];
  if (char === "o") {
    console.log(index + 1);
  }
}

console.log(text.replace(/l/g, ""));
