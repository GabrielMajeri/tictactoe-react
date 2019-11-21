import React from "react";
import Square from "./Square";

export default function Board({ squares, highlighted, onClick }) {
  const renderSquare = (i, highlighted) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        highlighted={highlighted}
        onClick={() => onClick(i)}
      />
    );
  };

  let rows = [];
  for (let i = 0; i < 3; ++i) {
    let row = [];
    for (let j = 0; j < 3; ++j) {
      const index = i * 3 + j;
      row.push(renderSquare(index, highlighted.includes(index)));
    }
    rows.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return <div>{rows}</div>;
}
