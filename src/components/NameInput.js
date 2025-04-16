// src/components/NameInput.js
import React, { useState } from "react";

const NameInput = ({ show, score, moves, time, difficulty, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Por favor, digite seu nome");
      return;
    }

    setIsSaving(true);

    try {
      await onSave(name);
      setName("");
      setError("");
    } catch (error) {
      setError("Erro ao salvar pontuação. Tente novamente.");
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nova Pontuação Alta!</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label="Fechar"
              disabled={isSaving}
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-center">Parabéns! Você conseguiu uma pontuação alta!</p>
            <h2 className="text-center mb-3">Pontuação: {score}</h2>
            <p className="text-center">
              ({moves} movimentos, {formatTime(time)}, Dificuldade: {getDifficultyName(difficulty)})
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Digite seu nome:
                </label>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="nameInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={20}
                  disabled={isSaving}
                  autoFocus
                  required
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Salvando...
                    </>
                  ) : (
                    "Salvar Pontuação"
                  )}
                </button>
              </div>
            </form>
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

export default NameInput;
