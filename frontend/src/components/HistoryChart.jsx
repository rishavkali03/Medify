import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-sm font-bold text-gray-900">
          {payload[0].value} {payload[0].unit || ''}
        </p>
      </div>
    );
  }
  return null;
};

const HistoryChart = ({
  title,
  data,
  dataKey,
  color = '#3B82F6',
  type = 'bar',
  unit = '',
  showGrid = true
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      {type === 'bar' ? (
        <BarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[4, 4, 0, 0]}
            barSize={30}
            unit={unit}
          />
        </BarChart>
      ) : (
        <AreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.1}
            unit={unit}
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  </div>
);

export default HistoryChart; 