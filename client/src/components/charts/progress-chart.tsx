import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ProgressData {
  date: string;
  value: number;
}

interface ProgressChartProps {
  data: ProgressData[];
  dataKey?: string;
  lineColor?: string;
  yAxisLabel?: string;
}

export function ProgressChart({ 
  data, 
  dataKey = 'value', 
  lineColor = '#1E90FF',
  yAxisLabel = 'Value'
}: ProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          width={30}
          label={{ 
            value: yAxisLabel, 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fontSize: 12, fill: '#9CA3AF' } 
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: 'none',
          }}
          formatter={(value: number) => [`${value}`, yAxisLabel]}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
          activeDot={{ r: 6, strokeWidth: 0, fill: lineColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
