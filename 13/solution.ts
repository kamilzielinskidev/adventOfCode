import * as fs from "fs";
import * as path from "path";

const main = () => {
  const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");
  const [dataTimestamp, dataBuses] = data.split("\n");
  const timestamp = parseInt(dataTimestamp);
  const buses = dataBuses
    .split(",")
    .filter((busPosition) => busPosition !== "x")
    .map((bus) => parseInt(bus));

  const minutesFromDepartingBuses = buses.map((bus) => bus - (timestamp % bus));
  const closesBusIndex = minutesFromDepartingBuses.findIndex(
    (val, _, arr) => val === Math.min(...arr)
  );

  console.log(
    buses[closesBusIndex] * minutesFromDepartingBuses[closesBusIndex]
  );
};

main();
