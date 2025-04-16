// src/components/HomeScreen.js
import React, { useState } from "react";

const HomeScreen = ({ onStartGame }) => {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <div className="home-screen text-center">
      <div className="container py-5">
        <h1 className="display-4 mb-4">Jogo da Memória</h1>
        <p className="lead mb-5">Teste sua memória encontrando todos os pares de cartas!</p>

        <div className="d-grid gap-3 col-md-6 mx-auto">
          <button className="btn btn-primary btn-lg" onClick={onStartGame}>
            Jogar
          </button>
          <button className="btn btn-outline-secondary btn-lg" onClick={() => setShowCredits(true)}>
            Créditos
          </button>
        </div>
      </div>

      {/* Modal de Créditos */}
      {showCredits && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Créditos</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCredits(false)}
                  aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">
                <h5>Jogo da Memória</h5>
                <p>Desenvolvido por: Seu Nome</p>
                <p>Versão: 1.0.0</p>
                <p>Tecnologias: React, Bootstrap, Node.js</p>
                <p>Todos os direitos reservados &copy; 2025</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowCredits(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop"></div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
