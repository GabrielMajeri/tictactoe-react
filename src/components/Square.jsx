import React from "react";

export default function Square({ value, highlighted, onClick }) {
  let className = "square";
  if (highlighted) {
    className += " highlighted";
  }
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}
