import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import Tile from "./Tile";
import "./App.css";
import { wait } from "./utils";
import { isMatch } from "./Helpers";
import Confetti from "react-confetti";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const Container = styled.div`
  margin: auto;
`;

const StyledButton = styled.button`
  border-radius: 25px;
  background-color: #4681f4;
  margin-bottom: 40px;
`;

export type CardType = {
  tileValue: number;
  colIndex: number;
  rowIndex: number;
};

const App = () => {
  const [board, setBoard] = useState<number[][]>([
    [1, 4, 6],
    [2, 1, 2],
    [3, 4, 5],
    [6, 3, 5],
  ]);

  const [hasWon, setHasWon] = useState(false);

  // keep track of the cards that are currently open
  const [cardsOpen, setCardsOpen] = useState<CardType[]>([]);

  // keep track of the number of cards that are open
  const [numCardsOpen, setNumCardsOpen] = useState<number>(0);

  // array of values which represents card values that have been picked already
  const [successCards, setSuccessCards] = useState<number[]>([]);

  // boolean to make cards unclickable
  const [isDisabled, setIsDisabled] = useState(false);

  const props = {
    cardsOpen,
    setCardsOpen,
    numCardsOpen,
    setNumCardsOpen,
    successCards,
    isDisabled,
  };

  const resetGame = () => window.location.reload();

  useEffect(() => {
    successCards.length === (board.length * board[0].length) / 2 &&
      setHasWon(true);
  }, [successCards]);

  useEffect(() => {
    if (numCardsOpen == 2) {
      setNumCardsOpen(0);
      setCardsOpen([]);

      isMatch(cardsOpen[0], cardsOpen[1])
        ? onSuccess(cardsOpen[0].tileValue)
        : onFailure();
    }
  }, [numCardsOpen]);

  // keep the cards turned outward
  const onSuccess = (successfulCard: number) => {
    setSuccessCards([...successCards, successfulCard]);
  };

  const disableCards = async () => {
    setIsDisabled(true);
    await wait(1000);
    setIsDisabled(false);
  };

  // turn the cards back around
  const onFailure = async () => {
    // Trigger an event to turn the cards back around
    // 'Change' (but keep the same) the success cards array to trigger the useEffect
    await disableCards();
    setSuccessCards([...successCards]);
  };

  return (
    <Container>
      <h1>Memory Game</h1>
      <StyledButton onClick={resetGame}>Reset game</StyledButton>
      {hasWon && <Confetti />}
      <Grid>
        {board.map((row: number[], rowIndex) =>
          row.map((value: number, colIndex) => (
            <Tile
              tileValue={value}
              {...props}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default App;
