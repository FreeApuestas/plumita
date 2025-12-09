export function getColorForPoints(puntos) {
  // RANGO:
  // 7 puntos → rojo suave (0°)
  // 4 puntos → naranja/amarillo (40°)
  // 1 punto  → verde suave (120°)

  // Normalizamos de 1–7 a rango 120 → 0
  const hue = 120 - ((puntos - 1) / (7 - 1)) * 120;

  // Saturación y luminosidad estilo iOS (tonos pastel)
  return `hsl(${hue}, 80%, 92%)`;
}
