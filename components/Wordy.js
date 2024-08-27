import useWordy from "@/hooks/useWordy";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import Modal from "./Modal";
import { FaBackspace, FaCheck } from "react-icons/fa";
import { lenguaje } from "@/const";
import useLenguaje from "@/hooks/useLenguaje";
import useFetchWord from "@/hooks/useFetchWord";

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
  const {solution} = useFetchWord(leng);
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys, resetGame } =
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

  useEffect(() => {
    resetGame(); 
  }, [leng]);

  const handleClick = (key) => {
    handleKeyUp({ key });
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
      </div>
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
          key={"backspace"}
          onClick={() => {
            handleClick("Backspace");
          }}
        >
          <FaBackspace />
        </button>

        {showModal && (
          <Modal isCorrect={isCorrect} turn={turn} solution={solution} titles={titles} />
        )}
      </div>
      <footer className="footer">
        <p>{titles.footerLabel}</p>
      </footer>
    </>
  );
}
