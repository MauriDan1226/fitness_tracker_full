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
import Icon from './Icon';

const AXIS = '#6f6b63';
const GRID = '#2a2825';
const WEIGHT = '#3a78b8';

function WeightChart({ data }) {
  return (
    <article className="card">
      <div className="chart-card__head">
        <h2 className="chart-card__title">Peso</h2>
        <span className="chart-card__subtitle">kg registrados en el perfil</span>
      </div>

      {data.length < 2 ? (
        <div className="empty-state">
          <span className="empty-state__icon">
            <Icon name="scale" size={28} />
          </span>
          <p className="empty-state__text">
            Actualiza tu peso en el perfil al menos dos veces para ver la evolucion.
          </p>
        </div>
      ) : (
        <div className="chart-card__body chart-card__body_tall">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 10, left: -22, bottom: 0 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="label" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke={AXIS}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={46}
                domain={['dataMin - 1.5', 'dataMax + 1.5']}
              />
              <Tooltip
                content={<ChartTooltip unit="kg" />}
                cursor={{ stroke: AXIS, strokeDasharray: '3 3' }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                name="Peso"
                stroke={WEIGHT}
                strokeWidth={2}
                dot={{ r: 2.5, fill: WEIGHT, strokeWidth: 0 }}
                activeDot={{ r: 4.5, strokeWidth: 2, stroke: '#121211' }}
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
