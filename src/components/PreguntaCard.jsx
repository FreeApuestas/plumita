export default function PreguntaCard({
  pregunta,
  puntos,
  onAnswer,
  respuestaActual
}) {
  const toggle = () => {
    const nuevoValor = !respuestaActual; // true / false
    onAnswer(nuevoValor); // enviamos BOOLEANO
  };

  return (
    <div className="card">
      <p className="pregunta">{pregunta}</p>

      <div className="botones">
        <button
          className={`btn ${respuestaActual ? "activo" : ""}`}
          onClick={toggle}
        >
          ✔ Cumple
        </button>
      </div>
    </div>
  );
}
