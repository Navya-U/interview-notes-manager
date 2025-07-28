import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import backimage from '../assets/backimage.jpg';
import axiosInstance from '../services/axiosInstance';

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Register | Notes Manager';
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/register', form);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backimage})`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 100%',
        backgroundRepeat: 'no-repeat',
        minHeight: '111vh',
        width: '100%',
      }}
    >
      <div
        className='container mt-1 align-items-center vh-100'
        style={{
          maxWidth: '600px',
        }}
      >
        <div className='text-center mb-4'>
          <h2 className='thq-heading-2'>Join Interview Notes Manager</h2>
          <p className='text-muted thq-body-small'>
            Organize your tech prep and stay ready.
          </p>
        </div>
        <div
          className='col-md-6 mx-auto card shadow p-4 w-100'
          style={{ borderRadius: '2.375rem' }}
        >
          <div className='text-center mb-4'>
            <img src={logo} alt='App Logo' style={{ width: '60px' }} />
          </div>
          <h3 className='text-center mb-3'>Create Account</h3>
          {error && <div className='alert alert-danger'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label>Name</label>
              <input
                name='name'
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label>Email</label>
              <input
                name='email'
                type='email'
                className='form-control'
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label>Password</label>
              <input
                name='password'
                type='password'
                className='form-control'
                onChange={handleChange}
                requires
              />
            </div>
            <button className='btn btn-secondary w-100'>Register</button>
          </form>

          <p className='mt-3 text-center text-muted'>
            Already have an account?{' '}
            <span
              className='text-primary'
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
