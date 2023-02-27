import { useEffect, useState } from "react";
import { board } from "./App";
import { TileType } from "./components/Tile/types";
import { isMatch } from "./Helpers";
import { wait } from "./utils";

export const useMemoryGame = () => {
  const [hasWon, setHasWon] = useState(false);
  const [tilesOpen, setTilesOpen] = useState<TileType[]>([]);
  const [successTiles, setSuccessTiles] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const props = {
    tilesOpen,
    setTilesOpen,
    successTiles,
    isDisabled,
    setIsDisabled,
    hasWon,
  };

  useEffect(() => {
    successTiles.length === (board.length * board[0].length) / 2 &&
      setHasWon(true);
  }, [successTiles]);

  useEffect(() => {
    if (tilesOpen.length == 2) {
      isMatch(tilesOpen[0], tilesOpen[1])
        ? onSuccess(tilesOpen[0].value)
        : onFailure();

      setTilesOpen([]);
    }
  }, [tilesOpen]);

  const onSuccess = (successfulCard: number) => {
    setSuccessTiles([...successTiles, successfulCard]);
  };

  const onFailure = async () => {
    await disableTiles();
    setSuccessTiles([...successTiles]);
  };

  const disableTiles = async () => {
    setIsDisabled(true);
    await wait(1000);
    setIsDisabled(false);
  };

  return props
}