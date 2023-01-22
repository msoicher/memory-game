import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import Tile from "./Tile";
import "./App.css";
import { resetGame, wait } from "./utils";
import { isMatch } from "./Helpers";
import Confetti from "react-confetti";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const StyledTitle = styled.h1`
  color: #D6D42B;
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

export type CardType = {
  tileValue: number;
  colIndex: number;
  rowIndex: number;
};

const App = () => {
  const [hasWon, setHasWon] = useState(false);
  const [cardsOpen, setCardsOpen] = useState<CardType[]>([]);
  const [numCardsOpen, setNumCardsOpen] = useState<number>(0);
  const [successCards, setSuccessCards] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const props = {
    cardsOpen,
    setCardsOpen,
    numCardsOpen,
    setNumCardsOpen,
    successCards,
    isDisabled,
  };

  useEffect(() => {
    successCards.length === (board.length * board[0].length) / 2 &&
      setHasWon(true);
  }, [successCards]);

  useEffect(() => {
    if (numCardsOpen == 2) {
      isMatch(cardsOpen[0], cardsOpen[1])
        ? onSuccess(cardsOpen[0].tileValue)
        : onFailure();

      setNumCardsOpen(0);
      setCardsOpen([]);
    }
  }, [numCardsOpen]);

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
          row.map((value: number, colIndex) => (
            <Tile
              tileValue={value}
              rowIndex={rowIndex}
              colIndex={colIndex}
              {...props}
            />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default App;
