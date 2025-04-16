import React from "react";

const ScoreBoard = ({ moves, matchedPairs, totalPairs, timer }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (matchedPairs / totalPairs) * 100;

  return (
    <div className="score-board">
      <div className="row text-center mb-2">
        <div className="col">
          <h5>Movimentos: {moves}</h5>
        </div>
        <div className="col">
          <h5>Tempo: {formatTime(timer)}</h5>
        </div>
      </div>
      <div className="progress-container">
        <div
          className="progress"
          role="progressbar"
          aria-label="Progresso do jogo"
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="progress-bar bg-success" style={{ width: `${progressPercentage}%` }}>
            {matchedPairs} / {totalPairs}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
