import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ActivityData {
  day: string;
  calories: number;
  steps: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis 
          dataKey="day" 
          scale="point" 
          padding={{ left: 20, right: 20 }} 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={false}
        />
        <YAxis 
          yAxisId="left"
          orientation="left"
          stroke="#FF4757"
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          hide
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          stroke="#1E90FF"
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          hide
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: 'none',
          }}
        />
        <Legend iconType="circle" />
        <Bar yAxisId="left" dataKey="calories" fill="#FF4757" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="steps" fill="#1E90FF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
