import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import Game from "./Game";

it("renders without crashing", () => {
  const { getByText } = render(<Game />);

  expect(getByText("Next player: X")).toBeInTheDocument();
});

function playGame(getAllByRole, moves) {
  const squares = getAllByRole("button");
  for (const move of moves) {
    fireEvent.click(squares[move]);
  }
}

async function expectWinner(getByText, winner) {
  const winnerElem = await waitForElement(() => getByText(`Winner: ${winner}`));
  expect(winnerElem).toBeInTheDocument();
}

it("detects when X wins", async () => {
  const { getAllByRole, getByText } = render(<Game />);
  playGame(getAllByRole, [0, 1, 4, 2, 8]);
  await expectWinner(getByText, "X");
});

it("detects when O wins", async () => {
  const { getAllByRole, getByText } = render(<Game />);
  playGame(getAllByRole, [0, 1, 2, 4, 5, 7]);
  await expectWinner(getByText, "O");
});

it("detects when it's a draw", async () => {
  const { getAllByRole, getByText } = render(<Game />);
  playGame(getAllByRole, [4, 0, 1, 2, 6, 7, 8, 3, 5]);
  expect(getByText("Draw")).toBeInTheDocument();
});
