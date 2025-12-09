import { useState } from "react";

export default function PreguntaCard({ pregunta, puntos, onAnswer }) {
  const [respuesta, setRespuesta] = useState(false);

  const handleRespuesta = (valor) => {
    setRespuesta(valor);
    onAnswer(valor ? puntos : 0);
  };

  return (
    <div className="card">
      <p className="pregunta">{pregunta}</p>

      <div className="botones">
        <button
          className={`btn ${respuesta === true ? "activo" : ""}`}
          onClick={() => handleRespuesta(!respuesta)}
        >
          ✔ Cumple
        </button>

      </div>
    </div>
  );
}
