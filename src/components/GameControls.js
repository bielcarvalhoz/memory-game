import React from "react";

const GameControls = ({ onNewGame, onDifficultyChange, difficulty, isGameActive }) => {
  return (
    <div className="game-controls">
      <div className="row mb-3">
        <div className="col">
          <button className="btn btn-primary w-100" onClick={onNewGame} aria-label="Iniciar Novo Jogo">
            {isGameActive ? "Reiniciar Jogo" : "Iniciar Jogo"}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <select
            className="form-select"
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            aria-label="Selecionar Dificuldade"
          >
            <option value="easy">Fácil (8 cartas)</option>
            <option value="medium">Médio (12 cartas)</option>
            <option value="hard">Difícil (16 cartas)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
