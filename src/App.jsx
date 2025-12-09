import { useState } from "react";
import preguntas from "./data/preguntas";
import PreguntaCard from "./components/PreguntaCard";

const MAPEO_HOMBRE = [
  { min: 0, max: 40, valor: "Macho" },
  { min: 41, max: 60, valor: "Pierde aceite" },
  { min: 61, max: 80, valor: "Bastante gay" },
  { min: 81, max: 1000, valor: "Completamente homosexual" },
];

const MAPEO_MUJER = [
  { min: 0, max: 40, valor: "Conduce camiones" },
  { min: 41, max: 60, valor: "Machirula" },
  { min: 61, max: 80, valor: "Mujer" },
  { min: 81, max: 1000, valor: "Princesa absoluta" },
];

export default function App() {
  const [puntos, setPuntos] = useState(Array(preguntas.length).fill(null));
  const [genero, setGenero] = useState("hombre");

  const total = puntos.reduce((acc, val) => acc + (val ?? 0), 0);

  const handleRespuesta = (index, valor) => {
    const copia = [...puntos];
    copia[index] = valor;
    setPuntos(copia);
  };

  const obtenerValorMapeado = () => {
    const tabla = genero === "hombre" ? MAPEO_HOMBRE : MAPEO_MUJER;
    return tabla.find(r => total >= r.min && total <= r.max)?.valor ?? "-";
  };

  return (
    <div className="container">
      <h1 className="titulo">Test</h1>

      {preguntas.map((item, index) => (
        <PreguntaCard
          key={index}
          pregunta={item.pregunta}
          puntos={item.puntos}
          onAnswer={(valor) => handleRespuesta(index, valor)}
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
