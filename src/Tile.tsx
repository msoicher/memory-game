import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ isOpen: boolean; isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 120px;
  height: 120px;
  isDisabled &:hover {
    cursor: pointer;
  }
  ${(props) => props.isOpen && "color: red;"}
  ${(props) => props.isDisabled && "cursor: not-allowed;"}
`;

type TileProps = {
  tileValue: number;
  cardsOpen: number[];
  setCardsOpen: (cards: number[]) => void;
  numCardsOpen: number;
  setNumCardsOpen: (numCards: number) => void;
  successCards: number[];
  isDisabled: boolean;
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
  } = props;

  const isSuccessCard = () => successCards.indexOf(tileValue) !== -1;

  // every time success cards changes, check if we are part of that success. If NOT,
  // turn it back around.
  useEffect(() => {
    !isSuccessCard() && setIsOpen(false);
  }, [successCards]);

  const [isOpen, setIsOpen] = useState(isSuccessCard);

  const valueToShow = isOpen ? tileValue : "X";

  // Only do anything here if we aren't a success card.
  const handleTileClick = (tileValue: number) => {
    if (!isSuccessCard()) {
      setNumCardsOpen(numCardsOpen + 1);
      setIsOpen(!isOpen); // we could be just turning 1 card around independently.
      setCardsOpenArray(tileValue);
    }
  };

  const setCardsOpenArray = (tileValue: number) => {
    const prevCardsOpen = cardsOpen;
    const newCardsOpen = [...prevCardsOpen, tileValue];
    setCardsOpen(newCardsOpen);
  };

  return (
    <Container
      isOpen={isOpen}
      isDisabled={isDisabled}
      onClick={() => isDisabled || (!isOpen && handleTileClick(tileValue))}
    >
      <h1>{valueToShow}</h1>
    </Container>
  );
};

export default Tile;
