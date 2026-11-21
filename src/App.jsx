
import { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const isDraw = !winner && board.every(Boolean);

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <p className="subtitle">Play with a friend!</p>

      <h2 className="status">
        {winner
          ? `Winner: ${winner}!`
          : isDraw
          ? "It's a draw!"
          : `Next player: ${isXNext ? 'X' : 'O'}`}
      </h2>

      <div className="board">
        {board.map((square, index) => (
          <button
            className="square"
            key={index}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

export default App;
