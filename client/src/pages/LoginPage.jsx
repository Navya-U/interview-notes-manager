import Login from './Login';
import loginImg from '../assets/loginImg.JPG';
import { useNavigate } from 'react-router-dom';
import logoAlter from '../assets/logoAlter.PNG';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className='container-fluid vh-100'>
      <div className='row h-100'>
        <div className='col-md-4  align-items-center justify-content-center'>
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
            <Login />
            <p className='text-center mt-3'>
              Don't have an account?{' '}
              <button
                className='btn btn-link p-0'
                onClick={() => navigate('/register')}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className='col-md-8 d-none d-md-block p-0'>
          <img src={loginImg} alt='Login Visual' className='login-img-style' />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
