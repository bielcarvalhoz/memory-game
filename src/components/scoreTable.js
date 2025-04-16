// src/components/Scoreboard.js
import React, { useEffect, useState } from "react";

const Scoretable = ({ show, onClose, onPlayAgain }) => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (show) {
      // Carregar as pontuações do servidor quando o componente for exibido
      fetchScores();
    }
  }, [show]);

  const fetchScores = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/scores");
      const data = await response.json();
      setScores(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar pontuações:", error);
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Top 10 Pontuações</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            ) : scores.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Posição</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Pontuação</th>
                      <th scope="col">Movimentos</th>
                      <th scope="col">Tempo</th>
                      <th scope="col">Dificuldade</th>
                      <th scope="col">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <tr key={score.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.moves}</td>
                        <td>{formatTime(score.time)}</td>
                        <td>{getDifficultyName(score.difficulty)}</td>
                        <td>{new Date(score.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center">Nenhuma pontuação registrada ainda.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary" onClick={onPlayAgain}>
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop"></div>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const getDifficultyName = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "Fácil";
    case "hard":
      return "Difícil";
    case "medium":
    default:
      return "Médio";
  }
};

export default Scoretable;
