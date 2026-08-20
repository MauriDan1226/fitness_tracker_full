// Tooltip compartido por las graficas, con el mismo aspecto que las tarjetas
function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="chart-tooltip__value" style={{ color: item.color }}>
          {item.name}: {item.value} {unit || item.unit || ''}
        </p>
      ))}
    </div>
  );
}

export default ChartTooltip;
