import React from "react";
import Card from "./Card";

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          symbol={card.symbol}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;
