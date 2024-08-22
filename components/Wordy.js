import useWordy from "@/hooks/useWordy";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import Modal from "./Modal";

import { FaBackspace, FaCheck } from "react-icons/fa";

const letters = [
  { key: "a" },
  { key: "b" },
  { key: "c" },
  { key: "d" },
  { key: "e" },
  { key: "f" },
  { key: "g" },
  { key: "h" },
  { key: "i" },
  { key: "j" },
  { key: "k" },
  { key: "l" },
  { key: "m" },
  { key: "n" },
  { key: "o" },
  { key: "p" },
  { key: "q" },
  { key: "r" },
  { key: "s" },
  { key: "t" },
  { key: "u" },
  { key: "v" },
  { key: "w" },
  { key: "x" },
  { key: "y" },
  { key: "z" },
];

export default function Wordy({ solution }) {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
    useWordy(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    if (isCorrect) {
      console.log("congrats!!");
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > 5) {
      console.log("unlucky!!");
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  const handleClick = (key) => {
    handleKeyUp({ key });
  };

  return (
    <>
      {console.log("solution", solution)}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <div className="keypad">
        {letters &&
          letters.map((letter) => {
            const color = usedKeys[letter?.key];
            return (
              <div
                className={color}
                key={letter.key}
                onClick={() => {
                  handleClick(letter.key);
                }}
              >
                {letter.key}
              </div>
            );
          })}
      </div>
      <div className="keypadFooter">
        <button
          className="action-button"
          key={"enter"}
          onClick={() => {
            handleClick("Enter");
          }}
        >
          <FaCheck /> {/* Ícono de Enter */}
        </button>
        <button
          className="action-button"
          key={"backspace"}
          onClick={() => {
            handleClick("Backspace");
          }}
        >
          <FaBackspace />
        </button>

        {showModal && (
          <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
        )}
      </div>
    </>
  );
}
