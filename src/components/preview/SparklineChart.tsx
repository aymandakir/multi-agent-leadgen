'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineChartProps {
  data: number[];
  color: string;
}

export default function SparklineChart({ data, color }: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  const colorMap: Record<string, string> = {
    'from-blue-500 to-blue-600': '#3b82f6',
    'from-purple-500 to-purple-600': '#a855f7',
    'from-green-500 to-green-600': '#22c55e',
    'from-orange-500 to-orange-600': '#f97316',
  };

  const strokeColor = colorMap[color] || '#3b82f6';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          dot={false}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

