import React, { memo } from "react";

const Card = ({ id, symbol, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      className={`card ${isFlipped || isMatched ? "flipped" : ""}`}
      onClick={handleClick}
      aria-label={`Carta ${isFlipped || isMatched ? "revelada: " + symbol : "não revelada"}`}
    >
      <div className="card-inner">
        <div className="card-face card-front">?</div>
        <div className="card-face card-back">{symbol}</div>
      </div>
    </div>
  );
};

export default memo(Card);
