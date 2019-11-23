const vegetables = ["potato", "tomato", "cucumber"];
const fruits = ["apple", "pineapple", "banana"];

const word = "cucumber";
if (vegetables.includes(word)) {
  console.log(Object.keys({ vegetables }));
} else if (fruits.includes(word)) {
  console.log(Object.keys({ fruits }));
}

switch (true) {
  case vegetables.includes(word):
    console.log(Object.keys({ vegetables }));
    break;
  case fruits.includes(word):
    console.log(Object.keys({ fruits }));
    break;
}
