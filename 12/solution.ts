import * as fs from "fs";
import * as path from "path";

type Position = {
  NS: number;
  WE: number;
};

type Instructions = {
  key: "N" | "W" | "E" | "S" | "R" | "L" | "F";
  value: number;
};

type Heading = "N" | "W" | "E" | "S";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const instructions = data.split("\n");
  const parsedInstructions: Instructions[] = instructions.map(
    (instruction) => ({
      key: instruction.slice(0, 1) as Instructions["key"],
      value: parseInt(instruction.slice(1)),
    })
  );
  let shipPosition: Position = { NS: 0, WE: 0 };
  let shipHeading: Heading = "E";

  const movePosition = (heading: Heading, value: number) => {
    switch (heading) {
      case "N":
        shipPosition.NS = shipPosition.NS - value;
        return;
      case "S":
        shipPosition.NS = shipPosition.NS + value;
        return;
      case "W":
        shipPosition.WE = shipPosition.WE - value;
        return;
      case "E":
        shipPosition.WE = shipPosition.WE + value;
        return;
    }
  };

  const rotate = (rotation: "R" | "L", value: number) => {
    const rotationMap: Heading[] = ["N", "E", "S", "W"];
    if (rotation === "L") rotationMap.reverse();
    const dirIndex = rotationMap.findIndex((val) => val === shipHeading);
    const moveBy = value / 90;
    shipHeading = rotationMap[(dirIndex + moveBy) % 4];
  };

  for (let { key, value } of parsedInstructions) {
    if (key === "N" || key === "S" || key === "E" || key === "W") {
      movePosition(key, value);
    }
    if (key === "R" || key === "L") {
      rotate(key, value);
    }
    if (key === "F") {
      movePosition(shipHeading, value);
    }
  }

  console.log(shipPosition.NS + shipPosition.WE);
};

main();
