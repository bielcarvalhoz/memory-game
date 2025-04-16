# Jogo da Memória

Um jogo da memória interativo desenvolvido com React e Node.js. O jogo inclui diferentes níveis de dificuldade, pontuações, e um placar para os melhores jogadores.

## Funcionalidades

- Tela inicial com botões para jogar e ver créditos
- Três níveis de dificuldade: Fácil (8 cartas), Médio (12 cartas) e Difícil (16 cartas)
- Sistema de pontuação baseado em tempo e movimentos
- Armazenamento de pontuações em um banco de dados SQLite
- Placar com as 10 melhores pontuações
- Interface responsiva com Bootstrap

## Tecnologias Utilizadas

- Frontend: React, Bootstrap
- Backend: Node.js, Express
- Banco de Dados: SQLite

## Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm (versão 6.x ou superior)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/memory-game.git
cd memory-game
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Este comando inicia tanto o servidor backend (na porta 5000) quanto o frontend (na porta 3000).

## Scripts Disponíveis

- `npm run dev`: Inicia o aplicativo em modo de desenvolvimento (frontend e backend)
- `npm run client`: Inicia apenas o cliente React
- `npm run server`: Inicia apenas o servidor Express com hot-reloading
- `npm run build`: Compila o aplicativo para produção
- `npm start`: Inicia o servidor em modo de produção

## Estrutura do Projeto

```
memory-game/
├── public/                  # Arquivos públicos
├── src/                     # Código fonte do frontend
│   ├── components/          # Componentes React
│   │   ├── Card.js          # Componente de carta
│   │   ├── GameBoard.js     # Tabuleiro do jogo
│   │   ├── GameControls.js  # Controles do jogo
│   │   ├── GameInstructions.js # Instruções do jogo
│   │   ├── GameOver.js      # Modal de fim de jogo
│   │   ├── HomeScreen.js    # Tela inicial
│   │   ├── NameInput.js     # Modal para inserir nome
│   │   ├── ScoreBoard.js    # Componente de pontuação do jogo atual
│   │   └── Scoreboard.js    # Modal com as melhores pontuações
│   ├── App.js               # Componente principal
│   ├── App.css              # Estilos
│   └── index.js             # Ponto de entrada
├── server.js                # Servidor Express
├── scores.db                # Banco de dados SQLite (criado automaticamente)
├── package.json             # Dependências e scripts
└── README.md                # Documentação
```

## Como Jogar

1. Na tela inicial, clique em "Jogar" para iniciar o jogo
2. Selecione o nível de dificuldade desejado
3. Clique nas cartas para virá-las e encontrar os pares
4. Complete o jogo encontrando todos os pares
5. Se você fizer uma das 10 melhores pontuações, poderá registrar seu nome
6. Veja sua posição no placar de líderes

## Desenvolvimento

Para contribuir com o projeto:

1. Crie um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona minha feature'`)
4. Faça push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
