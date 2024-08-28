import { useEffect, useState } from "react";

import { lenguaje } from "@/const";
import solutionCata from "../data/solucionscat.json";
import solutionFr from "../data/solucionsfrance.json";
import solutionSpain from "../data/solucionspain.json";
import solutionUsa from "../data/solucionsusa.json";

const useFetchWord = (leng) => {
  const [solutions, setSolutions] = useState();
  const [solution, setSolution] = useState();

  useEffect(() => {
    if (leng === lenguaje.cata) setSolutions(solutionCata);
    if (leng === lenguaje.spain) setSolutions(solutionSpain);
    if (leng === lenguaje.usa) setSolutions(solutionUsa);
    if (leng === lenguaje.fr) setSolutions(solutionFr);
  }, [leng]);

  useEffect(() => {
    if (solutions && solutions.length > 0)
      setSolution(solutions[Math.floor(Math.random() * solutions.length)].word);
  }, [solutions]);

  return { solution };
};

export default useFetchWord;
