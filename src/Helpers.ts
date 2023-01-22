import { CardType } from "./App";

// Return false if they're the same indexes. If not, check if they are the same value
export const isMatch = (card1: CardType, card2: CardType) => {
  if (card1.colIndex === card2.colIndex && card1.rowIndex === card2.rowIndex)
    return false;
  if (card1.tileValue !== card2.tileValue) return false;
  return true;
};
