export default function Modal({ isCorrect, turn, solution, titles }) {
  return (
    <div className="modal">
      {isCorrect ? (
        <div className="solution">
          <h1>{titles.win}</h1>
          <p>{titles.winDescription}</p>
        </div>
      ) : (
        <div>
          <p className="solution">the solution was: {solution}</p>
          <h1>{titles.loose}</h1>
          <p>{titles.looseDescription}</p>
        </div>
      )}
    </div>
  );
}
