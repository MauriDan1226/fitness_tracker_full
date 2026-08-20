// Tooltip comun a todas las graficas: la etiqueta en versal y el valor en cifras alineadas
function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="chart-tooltip__value">
          {item.value} {unit}
        </p>
      ))}
    </div>
  );
}

export default ChartTooltip;
