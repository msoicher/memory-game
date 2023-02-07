import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { resetGame, wait } from "./utils";
import { isMatch } from "./Helpers";
import Confetti from "react-confetti";
import { TileType } from "./components/Tile/types";
import Tile from "./components/Tile/Tile";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const StyledTitle = styled.h1`
  color: #d6d42b;
`;

const Container = styled.div`
  font-family: "Games", sans-serif;
  max-width: 1280px;
  padding: 2rem;
  text-align: center;
`;

const StyledButton = styled.button`
  border-radius: 25px;
  background-color: #4681f4;
  margin-bottom: 40px;
`;

const board = [
  [1, 4, 6],
  [2, 1, 2],
  [3, 4, 5],
  [6, 3, 5],
];

const App = () => {
  const [hasWon, setHasWon] = useState(false);
  const [tilesOpen, setTilesOpen] = useState<TileType[]>([]);
  const [successCards, setSuccessCards] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const props = {
    tilesOpen,
    setTilesOpen,
    successCards,
    isDisabled,
    setIsDisabled,
  };

  useEffect(() => {
    successCards.length === (board.length * board[0].length) / 2 &&
      setHasWon(true);
  }, [successCards]);

  useEffect(() => {
    if (tilesOpen.length == 2) {
      isMatch(tilesOpen[0], tilesOpen[1])
        ? onSuccess(tilesOpen[0].value)
        : onFailure();

      setTilesOpen([]);
    }
  }, [tilesOpen]);

  const onSuccess = (successfulCard: number) => {
    setSuccessCards([...successCards, successfulCard]);
  };

  const onFailure = async () => {
    await disableCards();
    setSuccessCards([...successCards]);
  };

  const disableCards = async () => {
    setIsDisabled(true);
    await wait(1000);
    setIsDisabled(false);
  };

  return (
    <Container>
      {hasWon && <Confetti />}
      <StyledTitle>Memory Game</StyledTitle>
      <StyledButton onClick={resetGame}>Reset</StyledButton>
      <Grid>
        {board.map((row: number[], rowIndex) =>
          row.map((value: number, columnIndex) => (
            <Tile
              tileValue={value}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              {...props}
            />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default App;
