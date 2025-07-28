import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import axiosInstance from '../services/axiosInstance';
import { useEffect, useState } from 'react';
import NotesPerCategoryChart from '../components/charts/NotesPerCategoryChart';
import NotesPerTagChart from '../components/charts/NotesPerTagChart';
import logoAlter from '../assets/logoAlter.PNG';
import TagCloudChart from '../components/TagCloudChart';
import NotesCountOverTimeChart from '../components/charts/NotesCountOverTimeChart';
import { useError } from '../context/ErrorContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showError, clearError } = useError();
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    document.title = 'Dashboard | Notes Manager';
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
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
    };

    fetchNotes();
  }, [clearError, showError]);

  const totalNotes = notes.length;
  const starredNotes = notes.filter((note) => note.starred).length;
  const categoryCount = new Set(notes.map((n) => n.category)).size;

  if (apiError) {
    return null;
  }

  if (loading) {
    return (
      <div className='container mt-5 text-center'>
        <h4>Loading your notes...</h4>
      </div>
    );
  }

  if (!loading && notes.length === 0) {
    return (
      <div className='container mt-5 text-center'>
        <h4>No notes Yet!</h4>
        <p>Start creating notes to keep your interview prep orgainzed.</p>
        <Link
          to='/add'
          className='btn btn-primary me-2'
          style={{
            backgroundColor: '#6c757d',
            borderColor: '#5f7083',
            color: 'white',
          }}
        >
          {' '}
          + Add Your First Note
        </Link>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>
          <div className='d-flex align-items-center mb-2'>
            <img src={logoAlter} alt='App Logo' className='logo-alter-img' />
            <h2 className='m-0 thq-heading-2'>Interview Notes Manager</h2>
          </div>
          <p className='text-muted thq-body-small'>
            Hi {user?.name}, Stay organized and track your preparation like a
            pro!
          </p>
        </div>
        <div className='d-flex justify-content-between'>
          <div>
            <Link to='/notes' className='btn btn-secondary me-2'>
              {' '}
              View Notes
            </Link>
            <Link to='/add' className='btn btn-secondary me-2'>
              {' '}
              + Add Note
            </Link>
          </div>
          <button className='btn btn-outline-danger' onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <Row className='mb-4'>
        <Col md={4}>
          <Card className='text-center shadow-sm'>
            <Card.Body>
              <h5>Total Notes</h5>
              <h3>{totalNotes}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='text-center shadow-sm'>
            <Card.Body>
              <h5>Starred Notes</h5>
              <h3>{starredNotes}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='text-center shadow-sm'>
            <Card.Body>
              <h5>Categories</h5>
              <h3>{categoryCount}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className='text-center p-3 shadow-sm mb-4'>
            <h5>Notes by category</h5>
            <div className='height-chart'>
              <NotesPerCategoryChart notes={notes} />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='text-center p-3 shadow-sm mb-4'>
            <h5>Tags Usage</h5>
            <div className='height-chart'>
              <NotesPerTagChart notes={notes} />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='text-center p-3 shadow-sm mb-4'>
            <h5>Notes Over Time</h5>
            <div className='height-chart'>
              <NotesCountOverTimeChart notes={notes} />
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='text-center p-3 shadow-sm mb-4'>
            <div className='height-chart'>
              <TagCloudChart notes={notes} />
            </div>
          </Card>
        </Col>
      </Row>

      {notes.length > 0 && (
        <>
          <h5 className='mb-3 mt-4 large-font'>Recent Notes</h5>
          <Row>
            {notes.slice(0, 3).map((note) => (
              <Col md={4} key={note._id}>
                <Card className='shadow-sm mb-3'>
                  <Card.Body>
                    <h6>{note.title}</h6>
                    <p className='small text-muted'>
                      {note.content.slice(0, 60)}...
                    </p>
                    <Link
                      to={`/note/${note._id}`}
                      className='btn btn-outline-secondary btn-sm me-2'
                    >
                      View
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

export default Dashboard;
