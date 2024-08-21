import solutions from "../data/solutions.json";

const useFetchWord = () => {
  const solution = solutions[Math.floor(Math.random() * solutions.length)].word;
  return { solution };
};

export default useFetchWord;
