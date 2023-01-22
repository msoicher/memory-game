import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CardType } from "./App";

const Container = styled.div<{ isOpen: boolean; isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  &:hover {
    cursor: pointer;
  }
  ${(props) => props.isOpen && "color: red;"}
  ${(props) => props.isDisabled && "cursor: not-allowed;"}
`;

type TileProps = {
  tileValue: number;
  cardsOpen: CardType[];
  setCardsOpen: (cards: CardType[]) => void;
  numCardsOpen: number;
  setNumCardsOpen: (numCards: number) => void;
  successCards: number[];
  isDisabled: boolean;
  rowIndex: number;
  colIndex: number;
};

const Tile = (props: TileProps) => {
  const {
    tileValue,
    cardsOpen,
    setCardsOpen,
    numCardsOpen,
    setNumCardsOpen,
    successCards,
    isDisabled,
    rowIndex,
    colIndex,
  } = props;

  const isSuccessCard = successCards.indexOf(tileValue) !== -1;

  useEffect(() => {
    !isSuccessCard && setIsOpen(false);
  }, [successCards]);

  const [isOpen, setIsOpen] = useState(isSuccessCard);

  const valueToShow = isOpen ? tileValue : "?";

  const handleTileClick = (rowIndex: number, colIndex: number) => {
    setNumCardsOpen(numCardsOpen + 1);
    setIsOpen(!isOpen);
    setCardsOpenArray(rowIndex, colIndex);
  };

  const setCardsOpenArray = (rowIndex: number, colIndex: number) => {
    setCardsOpen([
      ...cardsOpen,
      {
        tileValue,
        colIndex,
        rowIndex,
      },
    ]);
  };

  return (
    <Container
      isOpen={isOpen}
      isDisabled={isDisabled}
      onClick={() =>
        !isDisabled && !isSuccessCard && handleTileClick(colIndex, rowIndex)
      }
    >
      <h1>{valueToShow}</h1>
    </Container>
  );
};

export default Tile;
