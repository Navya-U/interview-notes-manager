import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#845EC2',
  '#FF6F91',
];

function NotesPerCategoryChart({ notes }) {
  const categoryData = notes.reduce((acc, note) => {
    acc[note.category] = (acc[note.category] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(categoryData).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  return (
    <div className='chart-card'>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            nameKey='name'
            outerRadius={100}
            fill='#8884d8'
            label
          >
            {'   '}

            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NotesPerCategoryChart;
