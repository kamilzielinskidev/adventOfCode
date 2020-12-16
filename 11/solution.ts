import * as fs from "fs";
import * as path from "path";

const STARTING_JOLTAGE = 0;

type Position = { value: "#" | "L" | "."; rowIndex: number; colIndex: number };

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const ferryPositionMap: Position[] = data
    .split("\n")
    .map((row, rowIndex) =>
      row.split("").map((val, colIndex) => ({
        value: val as Position["value"],
        rowIndex,
        colIndex,
      }))
    )
    .flat()
    .flat();

  const seatsMap = ferryPositionMap.filter(({ value }) => value !== ".");

  for (let seat of seatsMap) {
    seat.value = "#";
  }

  const getNeighbours = ({ rowIndex, colIndex }: Partial<Position>) => {
    return seatsMap.filter(
      (other) =>
        Math.abs(other.colIndex - colIndex) <= 1 &&
        Math.abs(other.rowIndex - rowIndex) <= 1 &&
        !(other.colIndex === colIndex && other.rowIndex === rowIndex)
    );
  };

  const getCrowdyPlaces = () =>
    seatsMap.filter(
      (position) =>
        getNeighbours(position).filter(({ value }) => value === "#").length >= 4
    );

  const getUncrowdyPlaces = () =>
    seatsMap
      .filter(({ value }) => value !== "#")
      .filter(
        (position) =>
          getNeighbours(position).filter(({ value }) => value === "#")
            .length === 0
      );

  const leaveCrowdyPlaces = () => {
    for (let { rowIndex, colIndex } of getCrowdyPlaces()) {
      seatsMap.find(
        (position) =>
          position.rowIndex === rowIndex && position.colIndex === colIndex
      ).value = "L";
    }
  };

  const sitNewPeoples = () => {
    for (let { rowIndex, colIndex } of getUncrowdyPlaces()) {
      seatsMap.find(
        (position) =>
          position.rowIndex === rowIndex && position.colIndex === colIndex
      ).value = "#";
    }
  };
  leaveCrowdyPlaces();
  let emptyPlaces = getUncrowdyPlaces().length;
  while (emptyPlaces > 0) {
    sitNewPeoples();
    leaveCrowdyPlaces();
    emptyPlaces = getUncrowdyPlaces().length;
  }
  console.log(seatsMap.filter(({ value }) => value === "#").length);
};

main();
