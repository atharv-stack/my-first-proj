import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true); // true = X, false = O
  const [message, setMessage] = useState("Let's Play the Game");

  const winnerPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const checkWinner = (newBoxes) => {
    for (let pattern of winnerPattern) {
      const [a, b, c] = pattern;
      if (
        newBoxes[a] &&
        newBoxes[a] === newBoxes[b] &&
        newBoxes[a] === newBoxes[c]
      ) {
        setMessage(
          `Congratulations! ${newBoxes[a]} Player Wins`
        );
        return true;
      }
    }
    return false;
  };

  const handleClick = (index) => {
    if (boxes[index] !== "" || message.includes("Wins")) return;

    const newBoxes = [...boxes];
    newBoxes[index] = turn ? "X" : "O";

    setBoxes(newBoxes);
    const winnerFound = checkWinner(newBoxes);

    if (!winnerFound) {
      setTurn(!turn);
    }
  };

  const handleRestart = () => {
    setBoxes(Array(9).fill(""));
    setTurn(true);
    setMessage("Let's Play the Game");
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {boxes.map((val, idx) => (
          <div
            key={idx}
            className="box"
            onClick={() => handleClick(idx)}
            style={{
              backgroundColor:
                val === "X"
                  ? "#7fffd4"
                  : val === "O"
                  ? "#ff83f1"
                  : "#9a05f0",
            }}
          >
            {val}
          </div>
        ))}
      </div>
      <p id="msg">{message}</p>
      <button id="restart" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
};

export default App;
