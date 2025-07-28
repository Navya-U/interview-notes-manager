import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    document.title = 'Not Found | Notes Manager';
  }, []);

  return (
    <div className='container text-center mt-5'>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to='/dashboard' className='btn btn-secondary'>
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
