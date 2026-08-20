import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartTooltip from './ChartTooltip';
import Icon from './Icon';

const AXIS = '#6f6b63';
const GRID = '#2a2825';
const MINUTES = '#7fa328';
const CALORIES = '#be5c28';

const axisProps = {
  stroke: AXIS,
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

/*
 * Minutos y calorias son magnitudes distintas, asi que no comparten eje:
 * van en dos paneles apilados que repiten el mismo eje temporal.
 */
function ActivityChart({ data }) {
  const hasActivity = data.some((week) => week.minutes > 0);

  if (!hasActivity) {
    return (
      <article className="card">
        <div className="chart-card__head">
          <h2 className="chart-card__title">Actividad</h2>
          <span className="chart-card__subtitle">ultimas 8 semanas</span>
        </div>
        <div className="empty-state">
          <span className="empty-state__icon">
            <Icon name="bars" size={28} />
          </span>
          <p className="empty-state__text">
            Registra entrenamientos para ver como evoluciona tu actividad semana a semana.
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <div className="chart-card__facet">
        <div className="chart-card__head">
          <h2 className="chart-card__title">Minutos por semana</h2>
          <span className="chart-card__subtitle">ultimas 8 semanas</span>
        </div>
        <div className="chart-card__body">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 6, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="label" {...axisProps} />
              <YAxis {...axisProps} width={38} />
              <Tooltip
                content={<ChartTooltip unit="min" />}
                cursor={{ fill: 'rgba(255,255,255,0.035)' }}
              />
              <Bar
                dataKey="minutes"
                name="Minutos"
                fill={MINUTES}
                radius={[4, 4, 0, 0]}
                maxBarSize={26}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card__facet">
        <div className="chart-card__head">
          <h2 className="chart-card__title">Calorias por semana</h2>
          <span className="chart-card__subtitle">kcal</span>
        </div>
        <div className="chart-card__body">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 6, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="caloriesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CALORIES} stopOpacity={0.26} />
                  <stop offset="100%" stopColor={CALORIES} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="label" {...axisProps} />
              <YAxis {...axisProps} width={38} />
              <Tooltip
                content={<ChartTooltip unit="kcal" />}
                cursor={{ stroke: AXIS, strokeDasharray: '3 3' }}
              />
              <Area
                type="monotone"
                dataKey="calories"
                name="Calorias"
                stroke={CALORIES}
                strokeWidth={2}
                fill="url(#caloriesFill)"
                dot={{ r: 2.5, fill: CALORIES, strokeWidth: 0 }}
                activeDot={{ r: 4.5, strokeWidth: 2, stroke: '#121211' }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}

export default ActivityChart;
