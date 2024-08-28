import { FaCheck } from "react-icons/fa";

const handleReset = () => {
  window.location.reload();
};

export default function Modal({ isCorrect, turn, solution, titles }) {
  return (
    <div className="modal">
      {isCorrect ? (
        <div>
          <p className="solution">
            <h1>{titles.win}</h1>
          </p>
          <p>{titles.winDescription}</p>
          <button onClick={handleReset} className="action-button-modal">
            <FaCheck />
          </button>
        </div>
      ) : (
        <div>
          <p className="solution">The solution was: {solution}</p>
          <h1>{titles.loose}</h1>
          <p>{titles.looseDescription}</p>
          <button onClick={handleReset} className="action-button-modal">
            <FaCheck />
          </button>
        </div>
      )}
    </div>
  );
}
