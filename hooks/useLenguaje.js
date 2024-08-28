import { lenguaje } from "@/const";
import { useEffect, useState } from "react";

import { labels } from "@/const";

const useLenguaje = () => {
  const [leng, setLeng] = useState(lenguaje.usa);
  const [titles, setTitles] = useState(leng);

  useEffect(() => {
    if (leng === lenguaje.cata) setTitles(labels.cata);
    if (leng === lenguaje.usa) setTitles(labels.usa);
    if (leng === lenguaje.spain) setTitles(labels.spain);
    if (leng === lenguaje.fr) setTitles(labels.france);
  }, [leng]);

  return { leng, setLeng, titles };
};

export default useLenguaje;
