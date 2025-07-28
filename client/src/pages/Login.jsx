import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Login | Notes Manager';
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/login', form);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className='container mt-5'>
      <h3 className='text-center mb-3'>Login </h3>
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={handleSubmit}>
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
            required
          />
        </div>
        <button className='btn btn-secondary w-100'>Login</button>
      </form>
    </div>
  );
}

export default Login;
