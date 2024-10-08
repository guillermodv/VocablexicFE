import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
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

const fetchMeme = async (word) => {
  //const response = await fetch(`https://meme-api.com/getMeme?word=${word}`);
  //const data = await response.json();
  //return data.url;
  return "https://www.latercera.com/resizer/SiNfPY7FHBb1-8UM0hCLXGO8wCI=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/7FFVS6CFZNBA7PZCTJILH7MJSA.jpeg"
};


export default function Modal({ isCorrect, turn, solution, titles }) {
  const [memeUrl, setMemeUrl] = useState(null);
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

  const handleSubmitPoint = async (id, measurement) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${apiUrl}/core/${id}/${measurement}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        const errorMessage = errorData.message || 'Error';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Submit!:', data);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userDataSaved = localStorage.getItem('userWordle');
    if (userDataSaved) {
      setUserSession(JSON.parse(userDataSaved));
    }
  }, []);

  useEffect(() => {
    if (solution) {
      fetchMeme(solution).then((url) => setMemeUrl(url));
    }
  }, [solution]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleEscape);
    document.querySelector(".modal-close").focus();
    
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleReset]);

  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 } // Lanzar desde el centro
      });
    }
  }, [isCorrect]);

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={handleReset}>
          <FaTimes />
        </button>
        {isCorrect ? (
          <>
            <h1 className="modal-title">{titles.win}  </h1>
            <p className="gamification">{titles.winDescription}</p>
            {solution && (
          <>
            <p className="memelabel">The meme of the day related to {solution} is:</p>
            <img src={memeUrl} alt={`Meme related to ${solution}`} className="meme" />
            <button
              onClick={() => handleCopyToClipboard(turn, solution)}
              className="share-button"
            >
              <FaShareAlt /> Copy your result to share!
            </button>
            {userSession && !success && <button
              onClick={() => handleSubmitPoint(userSession.id, turn)}
              className="share-button-point"
            >
              {loading ? 'Loading...' : 'Save your progress'}
            </button>}
          </>
        )}
          </>
        ) : (
          <>
            <p className="solution">The solution was: {solution}</p>
            <h1 className="gamification">{titles.loose}</h1>
            <p className="gamification">{titles.looseDescription}</p>
          </>
        )}

        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        {success && <p className="text-green-500 text-xs italic mt-2">Share successful!</p>}

        {!userSession && <p className="gamification">
          Want to save your progress?{" "}
          <a href="/login" className="login-link">
            Log in here
          </a>
          .
        </p>}
      </div>
    </div>
  );
}
