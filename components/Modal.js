export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect ? (
        <div className="solution">
          <h1>You Win!</h1>
          <p> You find the solution</p>
        </div>
      ) : (
        <div>
          <h1>Nevermind!</h1>
          <p> Better luck next time!</p>
        </div>
      )}
    </div>
  );
}
