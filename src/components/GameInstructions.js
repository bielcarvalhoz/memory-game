import React, { useState } from "react";

const GameInstructions = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <button className="btn btn-info btn-help" onClick={() => setShowInstructions(true)} aria-label="Ajuda">
        ?
      </button>

      {showInstructions && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Como Jogar</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowInstructions(false)}
                  aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">
                <ol>
                  <li>Clique em "Iniciar Jogo" para começar.</li>
                  <li>Clique em uma carta para virá-la.</li>
                  <li>Tente encontrar o par da carta virada.</li>
                  <li>Se você encontrar um par, as cartas permanecerão viradas.</li>
                  <li>Se as cartas não formarem um par, elas serão viradas para baixo novamente.</li>
                  <li>O jogo termina quando todos os pares forem encontrados.</li>
                  <li>Tente completar o jogo com o menor número de tentativas!</li>
                </ol>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowInstructions(false)}>
                  Entendi
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop"></div>
        </div>
      )}
    </>
  );
};

export default GameInstructions;
