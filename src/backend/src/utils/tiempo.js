// Convierte "HH:MM" a minutos desde medianoche.
function aMinutos(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

module.exports = { aMinutos };
