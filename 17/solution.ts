import * as fs from "fs";
import * as path from "path";

const data = fs.readFileSync(path.join(__dirname, "./data"), "utf8");

const AMOUNT_OF_CYCLES = 6;

const rows = data.split("\n");
const values = rows.map((row) => row.split(""));
const maxCubeSize = rows.length + AMOUNT_OF_CYCLES * 2;

let cubeMap = [...new Array(maxCubeSize)].map(() =>
  [...new Array(maxCubeSize)].map(() =>
    [...new Array(maxCubeSize)].map(() => ".")
  )
);

values.forEach((row, rowIndx) =>
  row.forEach((val, colIndx) => {
    cubeMap[Math.floor(maxCubeSize / 2)][AMOUNT_OF_CYCLES + rowIndx][
      AMOUNT_OF_CYCLES + colIndx
    ] = val;
  })
);

const getNghb = ([d1, d2, d3]: [number, number, number]) => {
  const cubeLngt = cubeMap[0].length - 1;
  const nghbArr = [];
  for (
    let d1Indx = Math.max(0, d1 - 1);
    d1Indx <= Math.min(cubeLngt, d1 + 1);
    d1Indx++
  ) {
    for (
      let d2Indx = Math.max(0, d2 - 1);
      d2Indx <= Math.min(cubeLngt, d2 + 1);
      d2Indx++
    ) {
      for (
        let d3Indx = Math.max(0, d3 - 1);
        d3Indx <= Math.min(cubeLngt, d3 + 1);
        d3Indx++
      ) {
        if (!(d1Indx === d1 && d2Indx === d2 && d3Indx === d3)) {
          nghbArr.push([d1Indx, d2Indx, d3Indx]);
        }
      }
    }
  }
  return nghbArr;
};

const getActvNghbLngt = ([d1, d2, d3]: [number, number, number]) =>
  getNghb([d1, d2, d3])
    .map(([d1, d2, d3]) => cubeMap[d1][d2][d3])
    .filter((v) => v === "#").length;

for (let cycle = 0; cycle < AMOUNT_OF_CYCLES; cycle++) {
  const cubeMapCopy = JSON.parse(JSON.stringify(cubeMap));
  cubeMap.forEach((d1, d1Indx) =>
    d1.forEach((d2, d2Indx) =>
      d2.forEach((val, d3Indx) => {
        const actvNghbAmnt = getActvNghbLngt([d1Indx, d2Indx, d3Indx]);
        if (val === "." && actvNghbAmnt === 3) {
          cubeMapCopy[d1Indx][d2Indx][d3Indx] = "#";
        }
        if (val === "#" && !(actvNghbAmnt === 2 || actvNghbAmnt === 3)) {
          cubeMapCopy[d1Indx][d2Indx][d3Indx] = ".";
        }
      })
    )
  );
  cubeMap = cubeMapCopy;
}

console.log(
  cubeMap
    .flat()
    .flat()
    .filter((v) => v === "#").length
);
