import * as fs from "fs";
import * as path from "path";

const STARTING_JOLTAGE = 0;

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const connectorsJoltage = data
    .split("\n")
    .map((connector) => parseInt(connector));

  connectorsJoltage.sort((a, b) => (a > b ? 1 : -1));
  let jumps1 = 0;
  let jumps2 = 0;
  let jumps3 = 1;

  for (let i = 0; i < connectorsJoltage.length; i += 1) {
    let diff = 0;
    if (i === 0) {
      diff = connectorsJoltage[0];
    } else {
      diff = connectorsJoltage[i] - connectorsJoltage[i - 1];
    }
    if (diff <= 3) {
      if (diff === 1) {
        jumps1 = jumps1 + 1;
      }
      if (diff === 2) {
        jumps2 = jumps2 + 1;
      }
      if (diff === 3) {
        jumps3 = jumps3 + 1;
      }
    }
  }

  console.log(jumps1 * jumps3);
};

main();
