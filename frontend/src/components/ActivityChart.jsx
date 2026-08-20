import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartTooltip from './ChartTooltip';

const AXIS_COLOR = '#6b7280';
const GRID_COLOR = '#262c35';
const BAR_COLOR = '#d6fd51';
const LINE_COLOR = '#ff6b35';

function ActivityChart({ data }) {
  const hasActivity = data.some((week) => week.minutes > 0);

  return (
    <article className="card">
      <h2 className="chart-card__title">Actividad por semana</h2>
      <p className="chart-card__subtitle">Minutos entrenados y calorias quemadas</p>

      {!hasActivity ? (
        <div className="empty-state">
          <span className="empty-state__icon">📊</span>
          <p className="empty-state__text">
            Registra entrenamientos para ver como evoluciona tu actividad semana a semana.
          </p>
        </div>
      ) : (
        <div className="chart-card__body">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={GRID_COLOR} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="label" stroke={AXIS_COLOR} fontSize={12} tickLine={false} />
              <YAxis stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Legend wrapperStyle={{ fontSize: 13, color: AXIS_COLOR }} />
              <Bar dataKey="minutes" name="Minutos" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
              <Line
                type="monotone"
                dataKey="calories"
                name="Calorias"
                stroke={LINE_COLOR}
                strokeWidth={2.5}
                dot={{ r: 3, fill: LINE_COLOR }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

export default ActivityChart;
