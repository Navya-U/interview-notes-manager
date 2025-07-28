import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

function NotesPerTagChart({ notes }) {
  const tagCountMap = notes.reduce((acc, note) => {
    if (note.tags && Array.isArray(note.tags)) {
      note.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const data = Object.entries(tagCountMap).map(([tag, count]) => ({
    tag,
    count,
  }));

  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='tag' />

          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey='count' fill='#82ca9d' name='Tag Count' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NotesPerTagChart;
