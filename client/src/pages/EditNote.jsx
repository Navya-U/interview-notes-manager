import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { toast } from 'react-toastify';

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    category: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Edit Note | Notes Manager';
  }, []);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`notes/${id}`);
        const note = res.data;

        setFormData({
          title: note.title,
          content: note.content,
          tags: setSelectedTags(note.tags),
          category: note.category,
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load note', err);
        navigate('/notes');
        toast.error('Note not found');
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        tags: selectedTags,
      };

      await axiosInstance.put(`notes/${id}`, payload);
      navigate('/notes');
      toast.success('Note updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update the note');
    }
  };

  if (loading) return <p className='text-center mt-5'>Loading note...</p>;

  return (
    <div className='container mt-4'>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label>Title</label>
          <input
            type='text'
            className='form-control'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-3'>
          <label>Content</label>
          <textarea
            className='form-control'
            name='content'
            rows='4'
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className='mb-3'>
          <label>Tags</label>
          <input
            type='text'
            className='form-control'
            placeholder='Type a tag and press Enter'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const trimmed = tagInput.trim();
                if (trimmed && !selectedTags.includes(trimmed)) {
                  setSelectedTags([...selectedTags, trimmed]);
                }
                setTagInput('');
              }
            }}
          />

          <div className='mt-2 d-flex flex-wrap gap-2'>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className='badge bg-info text-dark position-relative'
              >
                # {tag}
                <button
                  type='button'
                  className='btn-close btn-close-white btn-sm position-absolute top-0 end-0 me-1 mt-1'
                  aria-label='Remove'
                  onClick={() =>
                    setSelectedTags(selectedTags.filter((t) => t !== tag))
                  }
                ></button>
              </span>
            ))}
          </div>
        </div>

        <div className='mb-3'>
          <label>Category</label>
          <input
            type='text'
            className='form-control'
            name='category'
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <button className='btn btn-secondary'>Update Note</button>
      </form>
    </div>
  );
}

export default EditNote;
