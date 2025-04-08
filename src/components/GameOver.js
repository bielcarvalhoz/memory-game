import React from "react";

const GameOver = ({ show, score, moves, time, onClose, onNewGame }) => {
  if (!show) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Parabéns! Você completou o jogo!</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
          </div>
          <div className="modal-body text-center">
            <h2>Pontuação: {score}</h2>
            <p>Você completou o jogo em {moves} movimentos</p>
            <p>Tempo total: {formatTime(time)}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary" onClick={onNewGame}>
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop"></div>
    </div>
  );
};

export default GameOver;
