import * as fs from "fs";
import * as path from "path";

const ROWS_AMOUNT = 128;
const COLUMNS_AMOUNT = 8;

const getRows = () => Array.from(new Array(ROWS_AMOUNT)).map((_, i) => i);
const getColumns = () => Array.from(new Array(COLUMNS_AMOUNT)).map((_, i) => i);

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const seats = data.split("\n");
  const mappedSeat = seats.map((seat) => ({
    columnMap: seat.substr(7, 3),
    rowMap: seat.substr(0, 7),
  }));
  const seatsID = mappedSeat.map(({ columnMap, rowMap }) => {
    const rowDirectionsArr = rowMap.split("");
    const columnsDirectionsArr = columnMap.split("");

    const row = rowDirectionsArr.reduce(
      (rowsIndexes, rowDirection) =>
        rowDirection === "F"
          ? rowsIndexes.splice(0, rowsIndexes.length / 2)
          : rowsIndexes.splice(rowsIndexes.length / 2),
      getRows()
    )[0];
    const column = columnsDirectionsArr.reduce(
      (columnsIndexes, columnDirection) =>
        columnDirection === "L"
          ? columnsIndexes.splice(0, columnsIndexes.length / 2)
          : columnsIndexes.splice(columnsIndexes.length / 2),
      getColumns()
    )[0];
    return row * 8 + column;
  });

  console.log(Math.max(...seatsID));
};

main();
