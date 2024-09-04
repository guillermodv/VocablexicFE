import { FaShareAlt, FaTimes } from "react-icons/fa";

const handleReset = () => {
  window.location.reload();
};

const handleCopyToClipboard = (turn, solution) => {
  const textToCopy = `Check out my result! I found the solution in ${turn} turns, and the solution was: ${solution}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("Copied to clipboard!");
  });
};

export default function Modal({ isCorrect, turn, solution, titles }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={handleReset}>
          <FaTimes />
        </button>
        {isCorrect ? (
          <>
            <h1 className="solution">{titles.win}</h1>
            <p className="gamification">{titles.winDescription}</p>

            <button
              onClick={() => handleCopyToClipboard(turn, solution)}
              className="share-button"
            >
              <FaShareAlt /> Share your result
            </button>
          </>
        ) : (
          <>
            <p className="solution">The solution was: {solution}</p>
            <h1 className="gamification">{titles.loose}</h1>
            <p className="gamification">{titles.looseDescription}</p>
          </>
        )}

          <p className="gamification">
            Want to save your progress?{" "}
            <a href="/login" className="login-link">
              Log in here
            </a>
            .
          </p>
        </div>
    </div>
  );
}
