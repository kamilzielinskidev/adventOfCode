import * as fs from "fs";
import * as path from "path";

const tilesRoadmap = fs
  .readFileSync(path.join(__dirname, "./data"), "utf8")
  .split("\n")
  .map((v) => v.split(""));

for (let road of tilesRoadmap) {
  for (let i = 0; i < road.length; i++) {
    if (road[i] === "n" || road[i] === "s") {
      road[i] = road[i] + road[i + 1];
      road[i + 1] = undefined;
    }
  }
}

const parsedRoadMap = tilesRoadmap.map((road) => road.filter((v) => !!v));

const setPosition = (road: string[]) =>
  road.reduce(
    ([horizontal, vertical], step) => {
      if (step === "ne") {
        return [horizontal + 0.5, vertical - 1];
      } else if (step === "e") {
        return [horizontal + 1, vertical];
      } else if (step === "se") {
        return [horizontal + 0.5, vertical + 1];
      } else if (step === "sw") {
        return [horizontal - 0.5, vertical + 1];
      } else if (step === "w") {
        return [horizontal - 1, vertical];
      } else if (step === "nw") {
        return [horizontal - 0.5, vertical - 1];
      }
    },
    [0, 0]
  );

const roads = parsedRoadMap.map(setPosition);
const tiles = roads
  .reduce((tiles, nextRoad) => {
    const foundInTilesIndex = tiles.findIndex(
      ({ position }) => JSON.stringify(position) === JSON.stringify(nextRoad)
    );
    if (foundInTilesIndex === -1) {
      return [...tiles, { position: nextRoad, side: "black" }];
    } else {
      const side = tiles[foundInTilesIndex].side;
      if (side === "white") {
        tiles[foundInTilesIndex].side = "black";
      } else {
        tiles[foundInTilesIndex].side = "white";
      }
      return tiles;
    }
  }, [] as { position: number[]; side: string }[])
  .filter((v) => v.side === "black").length;

console.log(tiles);
