import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import ScoreBoard from "./components/ScoreBoard";
import GameInstructions from "./components/GameInstructions";
import GameOver from "./components/GameOver";
import "./App.css";

// Símbolos para as cartas (emojis)
const symbols = [
  "🍎",
  "🍌",
  "🍒",
  "🍓",
  "🍕",
  "🍔",
  "🍦",
  "🍩",
  "🍪",
  "🍫",
  "🍇",
  "🍉",
  "🥑",
  "🥕",
  "🌽",
  "🍄",
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [totalPairs, setTotalPairs] = useState(6);

  // Inicializa o jogo
  const initializeGame = useCallback(() => {
    let pairsCount;
    switch (difficulty) {
      case "easy":
        pairsCount = 4; // 8 cartas
        break;
      case "hard":
        pairsCount = 8; // 16 cartas
        break;
      case "medium":
      default:
        pairsCount = 6; // 12 cartas
        break;
    }

    setTotalPairs(pairsCount);

    // Cria pares de cartas
    const selectedSymbols = symbols.slice(0, pairsCount);
    let newCards = [];

    selectedSymbols.forEach((symbol, index) => {
      // Cria dois cards com o mesmo símbolo (um par)
      newCards.push({ id: index * 2, symbol, isFlipped: false, isMatched: false });
      newCards.push({ id: index * 2 + 1, symbol, isFlipped: false, isMatched: false });
    });

    // Embaralha as cartas
    newCards = shuffleCards(newCards);

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setIsActive(true);
    setGameOver(false);
    setStatusMessage("Jogo iniciado! Encontre os pares.");
  }, [difficulty]);

  // Embaralha as cartas usando o algoritmo Fisher-Yates
  const shuffleCards = (cards) => {
    const newCards = [...cards];
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    return newCards;
  };

  // Lida com o clique na carta
  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return;

    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card)));

    setFlippedCards((prevFlipped) => [...prevFlipped, id]);
  };

  // Verifica se há um par quando duas cartas são viradas
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);

      const firstCard = cards.find((card) => card.id === flippedCards[0]);
      const secondCard = cards.find((card) => card.id === flippedCards[1]);

      if (firstCard.symbol === secondCard.symbol) {
        // Par encontrado
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === flippedCards[0] || card.id === flippedCards[1] ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs((prevMatched) => prevMatched + 1);
        setFlippedCards([]);
        setStatusMessage("Par encontrado! Continue assim!");
      } else {
        // Não é um par, vira as cartas de volta após um delay
        setStatusMessage("Não é um par. Tente novamente!");
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === flippedCards[0] || card.id === flippedCards[1]
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Verifica se o jogo acabou
  useEffect(() => {
    if (matchedPairs > 0 && matchedPairs === totalPairs) {
      setIsActive(false);
      setGameOver(true);
      setStatusMessage("Parabéns! Você completou o jogo!");
    }
  }, [matchedPairs, totalPairs]);

  // Timer
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timer]);

  // Calcula a pontuação do jogador
  const calculateScore = () => {
    const baseScore = 1000;
    const timeDeduction = timer * 2;
    const movesDeduction = moves * 10;

    return Math.max(baseScore - timeDeduction - movesDeduction, 100);
  };

  // Altera a dificuldade do jogo
  const handleDifficultyChange = (newDifficulty) => {
    if (!isActive || window.confirm("Mudar a dificuldade irá reiniciar o jogo. Deseja continuar?")) {
      setDifficulty(newDifficulty);
      setIsActive(false);
    }
  };

  // Efeito para inicializar o jogo quando a dificuldade muda
  useEffect(() => {
    if (!isActive && cards.length === 0) {
      initializeGame();
    }
  }, [difficulty, isActive, cards.length, initializeGame]);

  return (
    <div className="memory-game container py-4">
      <header className="text-center mb-4">
        <h1>Jogo da Memória</h1>
        <p className="lead">Encontre todos os pares de cartas</p>
      </header>

      <div className="status-message alert alert-info" role="alert">
        {statusMessage}
      </div>

      <div className="row">
        <div className="col-md-8">
          <GameBoard cards={cards} onCardClick={handleCardClick} />
        </div>
        <div className="col-md-4">
          <ScoreBoard moves={moves} matchedPairs={matchedPairs} totalPairs={totalPairs} timer={timer} />
          <GameControls
            onNewGame={initializeGame}
            onDifficultyChange={handleDifficultyChange}
            difficulty={difficulty}
            isGameActive={isActive}
          />
        </div>
      </div>

      <GameInstructions />

      <GameOver
        show={gameOver}
        score={calculateScore()}
        moves={moves}
        time={timer}
        onClose={() => setGameOver(false)}
        onNewGame={initializeGame}
      />
    </div>
  );
};

export default App;
