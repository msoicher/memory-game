import styled from "styled-components";
import "./App.css";
import { resetGame } from "./utils";
import Confetti from "react-confetti";
import Tile from "./components/Tile/Tile";
import { useMemoryGame } from "./hooks/useMemoryGame";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const StyledTitle = styled.h1`
  color: #fffb00;
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

const App = () => {
  const props = useMemoryGame();
  return (
    <Container>
      {props.hasWon && <Confetti />}
      <StyledTitle>Memory Game</StyledTitle>
      <StyledButton onClick={resetGame}>Reset</StyledButton>
      <Grid>
        {props.board.map((row: number[], rowIndex) =>
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
