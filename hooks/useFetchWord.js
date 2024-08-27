import { useEffect, useState } from "react";

import { lenguaje } from "@/const";
import solutionUsa from "../data/solucionsusa.json";
import solutionCata from "../data/solucionscat.json";
import solutionSpain from "../data/solucionspain.json";

const useFetchWord = (leng) => {
  const [solutions, setSolutions] = useState();
  const [solution, setSolution] = useState();

  useEffect( () => {
    if (leng === lenguaje.cata) setSolutions(solutionCata);
    if (leng === lenguaje.spain) setSolutions(solutionSpain);
    if (leng === lenguaje.usa) setSolutions(solutionUsa);
  }, [leng] );
  
  
  useEffect( () => {
    if (solutions && solutions.length > 0 )
      setSolution(solutions[Math.floor(Math.random() * solutions.length)].word);
  }, [solutions] );

  return { solution };
};

export default useFetchWord;
