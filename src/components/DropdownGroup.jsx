import PreguntaCard from "./PreguntaCard";
import { getColorForPoints } from "../utils/getColorForPoints";
import { useRef, useEffect, useState } from "react";

export default function DropdownGroup({
  puntos,
  preguntas,
  onAnswer,
  respuestas,
  isOpen,
  onToggle
}) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight + "px");
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  const total = preguntas.length;
  const respondidas = preguntas.filter(
    (p) => respuestas[p.indexReal] === true
  ).length;

  return (
    <div className="dropdown">
      <button
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        style={{ backgroundColor: getColorForPoints(puntos) }}
        onClick={onToggle}
      >
        <span className="dropdown-title">
          Preguntas de {puntos} puntos ({respondidas}/{total})
        </span>
        <span className="dropdown-arrow">▼</span>
      </button>

      <div
        ref={contentRef}
        className="dropdown-animation-wrapper"
        style={{ height }}
      >
        <div className="dropdown-content">
          {preguntas.map((item) => (
            <PreguntaCard
              key={item.indexReal}
              pregunta={item.pregunta}
              puntos={item.puntos}
              onAnswer={(valorNumerico) =>
                onAnswer(item.indexReal, valorNumerico)
              }
              respuestaActual={respuestas[item.indexReal] === true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
