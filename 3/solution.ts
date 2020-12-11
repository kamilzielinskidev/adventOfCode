import * as fs from "fs";
import * as path from "path";

const SLOPE_RIGHT = 3;
const SLOPE_DOWN = 1;
const CLEAR_PATH_SIGN = ".";
const TREE_PATH_SIGN = "#";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");

  const initialMapWidth = data.split("\n")[0].length;
  const pathLenght = data.split("\n").length;
  const requiredMapMultiplication = Math.ceil(
    (pathLenght * SLOPE_RIGHT) / initialMapWidth
  );

  const map = data
    .split("\n")
    .map((row) => row.repeat(requiredMapMultiplication))
    .map((row) => row.split(""));

  let amountOfTrees = 0;

  for (let deltaY = 0; deltaY < pathLenght; deltaY += SLOPE_DOWN) {
    if (map[deltaY][deltaY * 3] === TREE_PATH_SIGN) {
      amountOfTrees += 1;
    }
  }

  console.log(amountOfTrees);
};

main();
