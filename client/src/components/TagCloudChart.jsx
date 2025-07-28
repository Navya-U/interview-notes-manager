import { TagCloud } from 'react-tagcloud';

function TagCloudChart({ notes }) {
  const tagCounts = {};

  notes.forEach((note) => {
    note.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const data = Object.entries(tagCounts).map(([tag, count]) => ({
    value: tag,
    count,
  }));

  return (
    <div className='p-4 bg-white rounded-xl shadow-md'>
      <h3 className='text-lg font-semibold mb-2'>Tag Cloud</h3>
      <TagCloud
        minSize={14}
        maxSize={20}
        tags={data}
        className='tag-cloud'
        colorOptions={{ luminosity: 'dark' }}
      />
    </div>
  );
}

export default TagCloudChart;
