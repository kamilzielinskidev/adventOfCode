import * as fs from "fs";
import * as path from "path";

type TileInfo = {
  id: number;
  tile: string[];
};

const tiles: TileInfo[] = fs
  .readFileSync(path.join(__dirname, "./data"), "utf8")
  .split("\n\n")
  .map((tileData) => {
    const id = parseInt(tileData.split("\n").slice(0, 1)[0].slice(5));
    const tile = tileData.split("\n").slice(1);
    return { id, tile };
  });

const getTileTopBorder = (tile: TileInfo["tile"]) => tile[0];
const getTileBottomBorder = (tile: TileInfo["tile"]) => tile[tile.length - 1];
const getTileLeftBorder = (tile: TileInfo["tile"]) =>
  tile.map((row) => row[0]).join("");
const getTileRightBorder = (tile: TileInfo["tile"]) =>
  tile.map((row) => row[tile[0].length - 1]).join("");

const flipTileHorizontal = (tile: TileInfo["tile"]) =>
  tile.map((row) => row.split("").reverse().join(""));
const flipTileVertical = (tile: TileInfo["tile"]) => tile.reverse();

const rotateTileClockwise = (tile: TileInfo["tile"]) => {
  let copy = JSON.parse(JSON.stringify(tile.map((v) => v.split(""))));
  tile.forEach((row, rowIndex) =>
    row.split("").forEach((val, colIndex) => {
      copy[colIndex][row.length - 1 - rowIndex] = val;
    })
  );
  return copy.map((v) => v.join(""));
};

const map: TileInfo[][] = [...new Array(15)].map((row) =>
  [...new Array(15)].map((v) => ({ id: null, tile: [] }))
);

map[13][10] = tiles[0];

const checkIfAnyBorderAjust = (
  tile1: TileInfo["tile"],
  tile2: TileInfo["tile"]
) => {
  if (getTileTopBorder(tile1) === getTileBottomBorder(tile2)) {
    return "TOP";
  }
  if (getTileBottomBorder(tile1) === getTileTopBorder(tile2)) {
    return "BOTTOM";
  }
  if (getTileLeftBorder(tile1) === getTileRightBorder(tile2)) {
    return "LEFT";
  }
  if (getTileRightBorder(tile1) === getTileLeftBorder(tile2)) {
    return "RIGHT";
  }
  return false;
};

const placeTileOnMap = (
  adjustment: "TOP" | "BOTTOM" | "LEFT" | "RIGHT",
  [row, col]: [number, number],
  tile: TileInfo
) => {
  if (adjustment === "TOP") {
    map[row - 1][col] = tile;
  }
  if (adjustment === "BOTTOM") {
    map[row + 1][col] = tile;
  }
  if (adjustment === "LEFT") {
    map[row][col - 1] = tile;
  }
  if (adjustment === "RIGHT") {
    map[row][col + 1] = tile;
  }
};

const findTiles = () => {
  tiles.slice(1).forEach((currentTile) => {
    let tileCopy = JSON.parse(JSON.stringify(currentTile.tile));

    mainLoop: for (let [rowIndex, mapRow] of map.entries()) {
      for (let [colIndex, mapTile] of mapRow.entries()) {
        const rTC = rotateTileClockwise;
        for (let rotation of [rTC, rTC, rTC, rTC]) {
          tileCopy = rotation(tileCopy);
          for (let flip of [flipTileHorizontal, flipTileVertical]) {
            tileCopy = flip(tileCopy);
            const adjustment = checkIfAnyBorderAjust(mapTile.tile, tileCopy);
            if (adjustment) {
              placeTileOnMap(adjustment, [rowIndex, colIndex], {
                id: currentTile.id,
                tile: tileCopy,
              });
              break mainLoop;
            }
          }
        }
      }
    }
  });
};

findTiles();
findTiles();
findTiles();
findTiles();
findTiles();
findTiles();
findTiles();
findTiles();

console.log(map.map((row) => row.map((v) => v.id || "    ").join("|")));
