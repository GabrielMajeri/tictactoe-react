import React, { useState } from "react";
import Board from "./Board";

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
      return {
        symbol: squares[a],
        line: [a, b, c]
      };
    }
  }
  return null;
}

function useGameState() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      move: null
    }
  ]);

  const [stepNumber, setStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const squares = current.squares;
  const winner = calculateWinner(current.squares);

  const nextPlayerSymbol = xIsNext ? "X" : "O";

  const jumpTo = step => {
    setStep(step);
    setXIsNext(step % 2 === 0);
  };

  const updateGameState = i => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = current.squares.slice();
    newSquares[i] = nextPlayerSymbol;

    const newHistory = history.slice(0, stepNumber + 1);
    setHistory(newHistory.concat([{ squares: newSquares, move: i }]));
    setStep(newHistory.length);

    setXIsNext(!xIsNext);
  };

  return [
    {
      history,
      squares,
      stepNumber,
      winner: winner ? winner.symbol : null,
      winningLine: winner ? winner.line : [],
      nextPlayerSymbol
    },
    jumpTo,
    updateGameState
  ];
}

export default function Game() {
  const [state, jumpTo, updateGameState] = useGameState();
  const [sortDescending, setSortDescending] = useState(false);

  const moves = state.history.map(({ move }, moveIdx) => {
    const selected = moveIdx === state.stepNumber;

    let label;
    if (moveIdx === 0) {
      label = "Go to game start";
    } else {
      const row = 1 + Math.floor(move / 3);
      const col = 1 + (move % 3);

      label = `Go to move #${moveIdx}: (${col}, ${row})`;
    }

    return (
      <li key={moveIdx}>
        <button
          className={selected ? "selected" : null}
          onClick={() => jumpTo(moveIdx)}
        >
          {label}
        </button>
      </li>
    );
  });

  if (sortDescending) {
    moves.reverse();
  }

  const handleClick = updateGameState;

  const handleSortOrderChange = evt => {
    setSortDescending(evt.target.checked);
  };

  let status;
  if (state.winner) {
    status = `Winner: ${state.winner}`;
  } else {
    status = `Next player: ${state.nextPlayerSymbol}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.squares}
          highlighted={state.winningLine}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <div>
          <input
            type="checkbox"
            id="sort-order"
            checked={sortDescending}
            onChange={handleSortOrderChange}
          />{" "}
          <label htmlFor="sort-order">Sort descending</label>
        </div>
        <ol reversed={sortDescending}>{moves}</ol>
      </div>
    </div>
  );
}
