import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { resetGame, wait } from "./utils";
import { isMatch } from "./Helpers";
import Confetti from "react-confetti";
import { TileType } from "./components/Tile/types";
import Tile from "./components/Tile/Tile";
import { useMemoryGame } from "./useGameLogic";

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

// todo: dynamically generate a board so that its always different.
export const board = [
  [1, 4, 6],
  [2, 1, 2],
  [3, 4, 5],
  [6, 3, 5],
];

const App = () => {
  const props = useMemoryGame();

  return (
    <Container>
      {props.hasWon && <Confetti />}
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
