import { useState } from "react";
import preguntasRaw from "./data/preguntas";
import DropdownGroup from "./components/DropdownGroup";
import { MAPEO_HOMBRE, MAPEO_MUJER } from "./data/mapeos";

export default function App() {
  const [respuestas, setRespuestas] = useState(
    Array(preguntasRaw.length).fill(null)
  );

  const [genero, setGenero] = useState("hombre");
  const [dropdownAbierto, setDropdownAbierto] = useState(null);

  // Agrupar preguntas por puntos
  const grupos = preguntasRaw.reduce((acc, item, indexReal) => {
    if (!acc[item.puntos]) acc[item.puntos] = [];
    acc[item.puntos].push({ ...item, indexReal });
    return acc;
  }, {});

  const handleRespuesta = (indexReal, valor) => {
    const copia = [...respuestas];
    copia[indexReal] = valor; // ahora es true/false
    setRespuestas(copia);
  };

  const total = preguntasRaw.reduce((acc, item, i) => {
    if (respuestas[i]) return acc + item.puntos;
    return acc;
  }, 0);

  const obtenerValorMapeado = () => {
    const tabla = genero === "hombre" ? MAPEO_HOMBRE : MAPEO_MUJER;
    return tabla.find(r => total >= r.min && total <= r.max)?.valor ?? "-";
  };

  return (
    <div className="container">
      <h1 className="titulo">Test</h1>

      {Object.keys(grupos)
        .sort((a, b) => b - a)
        .map((puntos) => (
          <DropdownGroup
            key={puntos}
            puntos={Number(puntos)}
            preguntas={grupos[puntos]}
            onAnswer={handleRespuesta}
            respuestas={respuestas}

            isOpen={dropdownAbierto === Number(puntos)}
            onToggle={() =>
              setDropdownAbierto(
                dropdownAbierto === Number(puntos) ? null : Number(puntos)
              )
            }
          />
        ))}

      <div className="resultado">
        <h2>Total: {total} puntos</h2>
      </div>

      <div className="seleccion">
        <label>Género:</label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>
      </div>

      <div className="resultado-mapeado">
        Resultado mapeado: <strong>{obtenerValorMapeado()}</strong>
      </div>
    </div>
  );
}
