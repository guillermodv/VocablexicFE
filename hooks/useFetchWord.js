import { useEffect, useState } from "react";

const useFetchWord = () => {
  const [solution, setSolution] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/solution")
      .then((res) => res.json())
      .then((json) => {
        setSolution(json[Math.floor(Math.random() * json.length)].word);
      });
  }, [setSolution]);
  return { solution };
};

export default useFetchWord;
