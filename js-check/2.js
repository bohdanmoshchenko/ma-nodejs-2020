function checkObject(object) {
  const IS_NOT_A = " is not a ";
  const STRING_TYPE = "string";
  const NUMBER_TYPE = "number";
  const startRangeNumber = 0;
  const endRangeNumber = 1;

  if (!checkType(object.firstName, STRING_TYPE)) {
    writeToConsole(object.firstName + IS_NOT_A + STRING_TYPE);
  }
  if (!checkType(object.lastName, STRING_TYPE)) {
    writeToConsole(object.firstName + IS_NOT_A + STRING_TYPE);
  }
  if (!checkType(object.rate, NUMBER_TYPE)) {
    writeToConsole(object.rate + IS_NOT_A + NUMBER_TYPE);
  }
  if (!checkRange(object.rate, startRangeNumber, endRangeNumber)) {
    writeToConsole("Wrong rate value");
  }
  if (user.address == null || Object.keys(user.address).length === 0) {
    writeToConsole(user.address + " is null or is empty");
  } else {
    if (!checkType(user.address.line1, STRING_TYPE)) {
      writeToConsole(user.address.line1 + IS_NOT_A + STRING_TYPE);
    }
    if (!checkType(user.address.line2, STRING_TYPE)) {
      writeToConsole(user.address.line2 + IS_NOT_A + STRING_TYPE);
    }
    if (!checkType(user.address.city, STRING_TYPE)) {
      writeToConsole(user.address.city + IS_NOT_A + STRING_TYPE);
    }
  }
  let phones = user.phoneNumbers;
  if (!Array.isArray(phones) || !phones) {
    writeToConsole(phones + " is not array or has 0 elements");
  } else {
    phones.forEach(element => {
      if (
        !checkType(element.type, STRING_TYPE) ||
        !Object.values(PhoneNumberType).includes(element.type)
      ) {
        writeToConsole(
          element.type + IS_NOT_A + STRING_TYPE + " or not a " + PhoneNumberType
        );
      }
      let regexPatern = /\(\d\d\d\)\s\d\d\d-\d\d\d\d/;
      if (
        !checkType(element.number, STRING_TYPE) ||
        !regexPatern.test(element.number)
      ) {
        writeToConsole(
          element.type + IS_NOT_A + STRING_TYPE + " or not a " + PhoneNumberType
        );
      }
    });
  }
}

function checkType(field, type) {
  return typeof field === type;
}

function checkRange(number, startNumber, endNumber) {
  return !(number < startNumber || number > endNumber);
}

function writeToConsole(str) {
  console.log(str);
}

let PhoneNumberType = {
  MOBILE: "MOBILE",
  LINE: "LINE",
  VOIP: "VOIP"
};
const user = {
  firstName: "John", // string
  lastName: "Doe", // string
  rate: 0.86, // number in range 0..1
  address: {
    // not empty object or null
    line1: "15 Macon St", // string
    line2: "", // string
    city: "Gotham" // string
  },
  phoneNumbers: [
    // array containing at least 1 element
    {
      type: "MOBILE", // string, limited to MOBILE | LINE | VOIP
      number: "(555) 555-1234" // string in specific format
    },
    {
      type: "LINE",
      number: "(555) 555-5678"
    }
  ]
};

checkObject(user);
