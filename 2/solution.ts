import * as fs from "fs";
import * as path from "path";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const dataArr = data.split("\n");
  const parsedData = dataArr.map((data) => {
    const parts = data.split(" ");
    const min = parseInt(parts[0].split("-")[0]);
    const max = parseInt(parts[0].split("-")[1]);
    const code = parts[1].substr(0, 1);
    const value = parts[2];
    return { min, max, code, value };
  });

  const amountOfGoodPassword = parsedData.reduce(
    (acc, { min, max, code, value }) => {
      const amountOfCodeLetters = value
        .split("")
        .reduce(
          (counter, letter) => (letter === code ? counter + 1 : counter),
          0
        );
      return amountOfCodeLetters >= min && amountOfCodeLetters <= max
        ? acc + 1
        : acc;
    },
    0
  );

  console.log(amountOfGoodPassword);
};

main();
