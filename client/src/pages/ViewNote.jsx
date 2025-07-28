import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import logoAlter from '../assets/logoAlter.PNG';

function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'View Note | Notes Manager';
  }, []);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        setError('Failed to load note.');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className='container mt-5 text-center'>
        <h4>Loading note...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mt-5 text-center text-danger'>{error}</div>
    );
  }

  if (!note) {
    return <div className='container mt-5 text-center'>Note not found.</div>;
  }

  return (
    <div className='container mt-4' style={{ maxWidth: '700px' }}>
      <div className='text-center margin-top--6'>
        <img
          className='mt-1'
          src={logoAlter}
          alt='App Logo'
          style={{ width: '200px' }}
        />
      </div>
      <div
        className='col-md-6 mx-auto card shadow p-4 w-100'
        style={{ borderRadius: '2.375rem' }}
      >
        <h2>{note.title}</h2>
        <p className='text-muted'>Category: {note.category}</p>

        <div className='mb-3'>
          {note.tags.map((tag) => (
            <span key={tag} className='badge badge-secondary me-2 bg-pinkshade'>
              {' '}
              #{tag}
            </span>
          ))}
        </div>
        <p>{note.content}</p>

        <div className='d-flex justify-content-between mt-4'>
          <Link to={`/edit/${note._id}`} className='btn btn-secondary btn-sm'>
            Edit Note
          </Link>
          <Link to='/notes' className='btn btn-outline-info btn-sm'>
            Back to Notes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
