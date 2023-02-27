import { TileType } from "./components/Tile/types";

/** 
 * Return false if they're the same indexes (same tile clicked). If not, check if they are the same value
 */

export const isMatch = (tileOne: TileType, tileTwo: TileType) => {
  if (tileOne.columnIndex === tileTwo.columnIndex && tileOne.rowIndex === tileTwo.rowIndex)
    return false;
  if (tileOne.value !== tileTwo.value) return false;
  return true;
};
