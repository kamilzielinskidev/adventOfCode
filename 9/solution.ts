import * as fs from "fs";
import * as path from "path";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const connectionNumbers = data
    .split("\n")
    .map((connectionNumber) => parseInt(connectionNumber));
  for (let i = 25; i < connectionNumbers.length; i += 1) {
    const arrCopy = [...connectionNumbers];
    const availableNumbers = arrCopy.slice(i - 25, i);
    const lookingForNumber = connectionNumbers[i];
    let isFound = false;

    for (let num1 of availableNumbers) {
      for (let num2 of availableNumbers) {
        if (num1 + num2 === lookingForNumber && num1 !== num2) {
          isFound = true;
        }
      }
    }
    if (!isFound) {
      console.log(lookingForNumber);
    }
  }
};

main();
