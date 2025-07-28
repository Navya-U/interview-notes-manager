import { useEffect, useState, useCallback } from 'react';
import { useError } from '../context/ErrorContext';
import { Link } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { exportNotesAsTextPDF } from '../utils/exportToPDF';
import { TagCloud } from 'react-tagcloud';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [sortOption, setSortOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { showError, clearError } = useError();
  const [apiError, setApiError] = useState(false);
  const notesPerPage = 6;

  useEffect(() => {
    document.title = 'Your Notes | Notes Manager';
  }, []);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/notes');
      setNotes(res.data);
      clearError();
      setApiError(false);
    } catch (err) {
      console.error('Failed to fetch notes', err);
      showError('Failed to connect to server. Please check your connection.');
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }, [showError, clearError]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags || [])));

  if (apiError) {
    return null;
  }

  if (loading) {
    return <p className='text-center mt-5'>Loading notes...</p>;
  }

  if (notes.length === 0) {
    return (
      <p className='text-center mt-5'>No notes found. Add your first one!</p>
    );
  }

  const toggleStarredNote = (id) => {
    return axiosInstance.patch(`/notes/${id}/star`);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategory === 'All' || note.category === selectedCategory;

    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      !selectedTag || (note.tags && note.tags.includes(selectedTag));

    const matchesStarred = !showStarredOnly || note.starred === true;

    return matchesCategory && matchesSearch && matchesTag && matchesStarred;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortOption === 'az') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'starred') {
      return b.starred - a.starred;
    }
    return 0;
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirm) return;

    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete the note');
    }
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(sortedNotes.length / notesPerPage);

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3'>
        <h2> Your Notes</h2>
        <div className='d-flex align-items-center gap-2'>
          <Link to='/add' className='btn btn-secondary'>
            + Add Note
          </Link>

          <button
            className='btn btn-outline-success'
            onClick={() => exportNotesAsTextPDF(notes)}
          >
            Export to PDF
          </button>
        </div>
      </div>

      <div className='card p-3 shadow-sm mb-4'>
        <div className='row g-2'>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              placeholder='Search notes...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='col-md-3'>
            <select
              className='form-select'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value='All'>All Categories</option>
              <option value='DSA'>DSA</option>
              <option value='System Design'>System Design</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='React'>React</option>
              <option value='Backend'>Backend</option>
              <option value='Behavioral'>Behavioral</option>
              <option value='Career'>Career</option>
              <option value='To-Do'>To-Do</option>
            </select>
          </div>

          <div className='col-md-3 d-flex gap-2'>
            <button
              type='button'
              className={`btn ${
                showStarredOnly ? 'btn-warning' : 'btn-outline-secondary'
              }`}
              onClick={() => setShowStarredOnly(!showStarredOnly)}
              style={{ width: '50%' }}
            >
              {showStarredOnly ? '★' : '☆'}
            </button>

            <select
              className='form-select'
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value='All'>Sort by</option>
              <option value='latest'>Latest</option>
              <option value='az'>A-Z</option>
              <option value='starred'>Starred</option>
            </select>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-end mt-2'>
        <button
          className='btn btn-outline-secondary btn-sm mt-2'
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setSelectedTag(null);
            setShowStarredOnly(false);
            setSortOption('All');
          }}
        >
          Reset All Filters
        </button>
      </div>

      <div className='mb-4 text-center'>
        <h5>Filter by Tag</h5>
        <TagCloud
          minSize={15}
          maxSize={25}
          tags={allTags.map((tag) => ({
            value: tag,
            count: notes.filter((note) => note.tags?.includes(tag)).length,
          }))}
          className='d-inline-block'
          onClick={(tag) => setSelectedTag(tag.value)}
        />

        {selectedTag && (
          <div className='mt-2'>
            <button
              className='btn btn-sm btn-secondary'
              onClick={() => setSelectedTag(null)}
            >
              Clear Tag Filter
            </button>
          </div>
        )}
      </div>

      {sortedNotes.length === 0 && (
        <div className='text-center my-4'>
          <h5>No notes match your criteria</h5>
          <p>Try adjusting your filters or search keywords.</p>
        </div>
      )}

      <div className='row'>
        <AnimatePresence>
          {currentNotes.map((note) => (
            <motion.div
              key={note._id}
              className='col-md-4 mb-3'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className='card h-100 shadow-sm note-card'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    {note.title}
                    <button
                      onClick={async () => {
                        try {
                          await toggleStarredNote(note._id);
                          fetchNotes();
                        } catch (err) {
                          console.error('Failed to toggle star', err);
                        }
                      }}
                      className='btn btn-sm'
                      title={note.starred ? 'Unstar Note' : 'Star Note'}
                    >
                      {note.starred ? '⭐' : '☆'}
                    </button>
                  </h5>

                  <p className='card-text'>
                    {note.content.substring(0, 100)}...
                  </p>
                  <small className='text-muted'>
                    <strong>Category:</strong>
                    {note.category} <br />
                    <strong>Tags:</strong> {note.tags.join(', ')} <br />
                    <strong>Created: </strong>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </small>
                </div>

                <div className='card-footer d-flex justify-content-between'>
                  <div>
                    <Link
                      to={`/note/${note._id}`}
                      className='btn btn-outline-secondary btn-sm me-2'
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${note._id}`}
                      className='btn btn-sm btn-outline-secondary'
                    >
                      Edit
                    </Link>
                  </div>

                  <button
                    className='btn btn-sm btn-outline-danger'
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {sortedNotes.length !== 0 && (
        <div className='d-flex justify-content-center mt-4'>
          <nav>
            <ul className='pagination'>
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <button
                  className='page-link'
                  onClick={() => setCurrentPage(currentPage - 1)}
                  aria-label='Previous'
                >
                  <span aria-hidden='true'>&laquo;</span>
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className='page-link'
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? 'disabled' : ''
                }`}
              >
                <button
                  className='page-link'
                  onClick={() => setCurrentPage(currentPage + 1)}
                  aria-label='Next'
                >
                  <span aria-hidden='true'>&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NotesList;
