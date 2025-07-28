import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const NotesCountOverTimeChart = ({ notes }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const countsByDate = {};

    notes.forEach((note) => {
      const date = new Date(note.createdAt).toISOString().split('T')[0];
      countsByDate[date] = (countsByDate[date] || 0) + 1;
    });

    const formatted = Object.entries(countsByDate).map(([date, count]) => ({
      date,
      count,
    }));

    formatted.sort((a, b) => new Date(a.date) - new Date(b.date));
    setChartData(formatted);
  }, [notes]);

  return (
    <div className='chart-card'>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='count'
            stroke='#8884d8'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotesCountOverTimeChart;
