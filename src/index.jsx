import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [stepNumber, setStep] = useState(0);

  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);

  const current = history[stepNumber];

  const jumpTo = step => {
    setStep(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const label = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{label}</button>
      </li>
    );
  });

  const [xIsNext, setXIsNext] = useState(true);
  const nextPlayerSymbol = xIsNext ? "X" : "O";

  const handleClick = i => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = current.squares;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = nextPlayerSymbol;
    setHistory(newHistory.concat([{ squares: newSquares }]));
    setStep(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${nextPlayerSymbol}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<Game />, root);
