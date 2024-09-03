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
            <h1>{titles.win}</h1>
            <p>{titles.winDescription}</p>

            <p>Share your result:</p>
            <button
              onClick={() => handleCopyToClipboard(turn, solution)}
              className="share-button"
            >
              <FaShareAlt /> Copy
            </button>
          </>
        ) : (
          <>
            <p className="solution">The solution was: {solution}</p>
            <h1>{titles.loose}</h1>
            <p>{titles.looseDescription}</p>
          </>
        )}

        <div className="login-suggestion">
          <p>
            Want to save your progress?{" "}
            <a href="/login" className="login-link">
              Log in here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
