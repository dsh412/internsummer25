import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import axios from 'axios';

function TestChart() {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const radian = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * radian);
  const y = cy + radius * Math.sin(-midAngle * radian);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

  return (
    <PieChart width={400} height={600}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={200}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart> 
  )
}

export default TestChart;