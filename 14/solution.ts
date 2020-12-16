import * as fs from "fs";
import * as path from "path";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const lines = data.split("\n");

  const parseMask = (maskLine: string) => maskLine.split("").slice(7).join("");
  const parseMem = (memLine: string) => {
    const memBlock = parseInt(memLine.match(/\[.*\]/g)[0].slice(1, -1));
    const value = parseInt(memLine.match(/=.*/g)[0].slice(2));
    return { memBlock, value };
  };
  const checkLine = (line: string) =>
    line.startsWith("mask") ? "mask" : "mem";
  const toBinary = (value: number) => Number(value).toString(2);

  let currentMask = "";
  let memBlocks = [];

  for (let line of lines) {
    const lineType = checkLine(line);
    if (lineType === "mask") {
      currentMask = parseMask(line);
      continue;
    }
    if (lineType === "mem") {
      const { memBlock, value } = parseMem(line);
      const binaryValue = toBinary(value);
      const paddedBinaryValue = binaryValue
        .padStart(currentMask.length, "0")
        .split("");
      const splittedMask = currentMask.split("");
      const maskedValue = parseInt(
        paddedBinaryValue
          .map((val, i) => (splittedMask[i] === "X" ? val : splittedMask[i]))
          .join(""),
        2
      );
      memBlocks[memBlock] = maskedValue;
    }
  }

  console.log(memBlocks.reduce((acc, val) => acc + val, 0));
};

main();
