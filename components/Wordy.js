import { lenguaje } from "@/const";
import useFetchWord from "@/hooks/useFetchWord";
import useLenguaje from "@/hooks/useLenguaje";
import useWordy from "@/hooks/useWordy";
import { useEffect, useState } from "react";
import { FaBackspace, FaCheck } from "react-icons/fa";
import Grid from "./Grid";
import Modal from "./Modal";

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

export default function Wordy() {
  const { setLeng, titles, leng } = useLenguaje();
  const { solution } = useFetchWord(leng);
  const {
    currentGuess,
    handleKeyUp,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    resetGame,
    message,
  } = useWordy(solution, titles);

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

  useEffect(() => {
    resetGame();
  }, [leng]);

  const handleClick = (key) => {
    handleKeyUp({ key });
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="icon-buttons">
        <button
          className={`icon-button ${leng === lenguaje.spain ? "selected" : ""}`}
          onClick={() => setLeng(lenguaje.spain)}
        >
          <img src="/spain.png" alt="España" />
        </button>
        <button
          className={`icon-button ${
            leng === lenguaje.mexico ? "selected" : ""
          }`}
          onClick={() => setLeng(lenguaje.mexico)}
        >
          <img src="/mexico.png" alt="Mexico" />
        </button>
        <button
          className={`icon-button ${
            leng === lenguaje.catalonia ? "selected" : ""
          }`}
          onClick={() => setLeng(lenguaje.cata)}
        >
          <img src="/catalonia.png" alt="Cataluña" />
        </button>
        <button
          className={`icon-button ${leng === lenguaje.usa ? "selected" : ""}`}
          onClick={() => setLeng(lenguaje.usa)}
        >
          <img src="/usa.png" alt="USA" />
        </button>
        <button
          className={`icon-button ${leng === lenguaje.fr ? "selected" : ""}`}
          onClick={() => setLeng(lenguaje.fr)}
        >
          <img src="/francia.png" alt="Fr" />
        </button>
      </div>
      <div className="solution">{message}</div>
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
          <FaCheck />
        </button>
        <button
          className="action-button"
          key={"reload"}
          onClick={() => {
            handleReset();
          }}
        >
          Reset
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
          <Modal
            isCorrect={isCorrect}
            turn={turn}
            solution={solution}
            titles={titles}
          />
        )}
      </div>
      {/* <footer className="footer">
        <p>{titles.footerLabel}</p>
      </footer> */}
    </>
  );
}
