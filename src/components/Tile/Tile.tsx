import { useEffect, useState } from "react";
import styled from "styled-components";
import { TileType } from "./types";

const Container = styled.div<{ isOpen: boolean; isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  ${(props) => props.isOpen && "color: red;"}
  ${(props) =>
    props.isDisabled ? "cursor: not-allowed;" : "&:hover { cursor: pointer; }"}
`;

type TileProps = {
  tileValue: number;
  tilesOpen: TileType[];
  setTilesOpen: (cards: TileType[]) => void;
  successCards: number[];
  isDisabled: boolean;
  rowIndex: number;
  columnIndex: number;
};

const Tile = (props: TileProps) => {
  const {
    tileValue,
    tilesOpen,
    setTilesOpen,
    successCards,
    isDisabled,
    rowIndex,
    columnIndex,
  } = props;

  const isSuccessCard = successCards.indexOf(tileValue) !== -1;

  useEffect(() => {
    !isSuccessCard && setIsOpen(false);
  }, [successCards]);

  const [isOpen, setIsOpen] = useState(isSuccessCard);

  const valueToShow = isOpen ? tileValue : "?";

  const handleTileClick = (rowIndex: number, columnIndex: number) => {
    setIsOpen(!isOpen);
    setTilesOpen([
      ...tilesOpen,
      {
        value: tileValue,
        columnIndex,
        rowIndex,
      },
    ]);
  };

  return (
    <Container
      isOpen={isOpen}
      isDisabled={isDisabled}
      onClick={() =>
        !isDisabled && !isSuccessCard && handleTileClick(columnIndex, rowIndex)
      }
    >
      <h1>{valueToShow}</h1>
    </Container>
  );
};

export default Tile;
