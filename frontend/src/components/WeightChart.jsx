import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const AXIS_COLOR = '#6b7280';
const GRID_COLOR = '#262c35';
const LINE_COLOR = '#38bdf8';

function WeightChart({ data }) {
  return (
    <article className="card">
      <h2 className="chart-card__title">Evolucion del peso</h2>
      <p className="chart-card__subtitle">Cada cambio guardado en tu perfil</p>

      {data.length < 2 ? (
        <div className="empty-state">
          <span className="empty-state__icon">⚖️</span>
          <p className="empty-state__text">
            Actualiza tu peso en el perfil al menos dos veces para ver la evolucion.
          </p>
        </div>
      ) : (
        <div className="chart-card__body">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={GRID_COLOR} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="label" stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
              <YAxis
                stroke={AXIS_COLOR}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip content={<ChartTooltip unit="kg" />} cursor={{ stroke: GRID_COLOR }} />
              {/* sin animacion: recharts no dibuja los puntos hasta terminarla */}
              <Line
                type="monotone"
                dataKey="weight"
                name="Peso"
                stroke={LINE_COLOR}
                strokeWidth={2.5}
                dot={{ r: 3, fill: LINE_COLOR }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

export default WeightChart;
