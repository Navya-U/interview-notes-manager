import { useError } from '../context/ErrorContext';
import nonetwork from '../assets/nonetwork.jpg';

function GlobalErrorBanner() {
  const { errorMessage, clearError, showAlert } = useError();

  if (!errorMessage) return null;

  return (
    <>
      {showAlert && (
        <div className='alert alert-danger text-center' role='alert'>
          {errorMessage}
          <button onClick={clearError} className='btn btn-sm btn-light ms-3'>
            Dismiss
          </button>
        </div>
      )}
      <div className='text-center' style={{ marginTop: '-6%' }}>
        <img
          className='mt-1'
          src={nonetwork}
          alt='No Net'
          style={{ width: '700px' }}
        />
      </div>
    </>
  );
}

export default GlobalErrorBanner;
