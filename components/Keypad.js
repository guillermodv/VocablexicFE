import { useEffect, useState } from "react";
import "../app/index.css";

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null);
  console.log("letters", letters);
  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);
  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter?.key];
          return (
            <div className={color} key={letter.key}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
