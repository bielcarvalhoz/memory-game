// server.js (continuação)
// server.js
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

// Conectar ao banco de dados SQLite
const dbPath = path.join(__dirname, "scores.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");

    // Criar tabela de pontuações se não existir
    db.run(`
      CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL,
        moves INTEGER NOT NULL,
        time INTEGER NOT NULL,
        difficulty TEXT NOT NULL,
        date TEXT NOT NULL
      )
    `);
  }
});

// Rotas da API

// Obter as 10 melhores pontuações
app.get("/api/scores", (req, res) => {
  const query = `
    SELECT * FROM scores
    ORDER BY score DESC
    LIMIT 10
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar pontuações:", err.message);
      return res.status(500).json({ error: "Erro ao buscar pontuações" });
    }

    res.json(rows);
  });
});

// Verificar se uma pontuação está entre as 10 melhores
app.post("/api/scores/check", (req, res) => {
  const { score, difficulty } = req.body;

  // Consulta para verificar se a pontuação está entre as 10 melhores
  const query = `
    SELECT COUNT(*) as count
    FROM scores
    WHERE score >= ?
  `;

  db.get(query, [score], (err, row) => {
    if (err) {
      console.error("Erro ao verificar pontuação:", err.message);
      return res.status(500).json({ error: "Erro ao verificar pontuação" });
    }

    // Se houver menos de 10 pontuações ou a nova pontuação for maior que alguma das existentes
    const isHighScore = row.count < 10;

    res.json({ isHighScore });
  });
});

// Salvar uma nova pontuação
app.post("/api/scores", (req, res) => {
  const { name, score, moves, time, difficulty, date } = req.body;

  // Validação dos dados
  if (!name || !score || !difficulty) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  const query = `
    INSERT INTO scores (name, score, moves, time, difficulty, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(query, [name, score, moves, time, difficulty, date], function (err) {
    if (err) {
      console.error("Erro ao salvar pontuação:", err.message);
      return res.status(500).json({ error: "Erro ao salvar pontuação" });
    }

    res.status(201).json({
      id: this.lastID,
      message: "Pontuação salva com sucesso!",
    });
  });
});

// Rota para todas as outras requisições (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Fechar o banco de dados ao encerrar o aplicativo
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Erro ao fechar o banco de dados:", err.message);
    } else {
      console.log("Conexão com o banco de dados fechada.");
    }
    process.exit(0);
  });
});
