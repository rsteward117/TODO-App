import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../authContext';
import { BACKEND_URL } from '../config';

function Login() {
  const { user, setUser, jsonwebtoken, setJsonwebtoken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [getErrors, setGetErrors] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      setJsonwebtoken(res.data.token);
      setUser(res.data.user);
      setMessage('You have successfully logged in');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setGetErrors(err.response?.data?.message || 'An error occurred');
      setMessage('Login was unsuccessful');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  if (user) {
    return <h1>Welcome {user.username}</h1>;
  }

  return (
    <div className="container my-5">
      <div 
        className="card mx-auto" 
        style={{ 
          maxWidth: '500px', 
          background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)', 
          border: '2px solid #cfcdc1', 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' 
        }}
      >
        <div className="card-body">
          <div className="text-center mb-4">
            <h1 style={{ fontFamily: 'Cinzel, serif', color: '#FFD700' }}>
              Welcome Back Inquistor!
            </h1>
            <h2 style={{ fontFamily: 'Lora, serif', color: '#B0C4DE', fontSize: '1.2rem' }}>
              Please enter your credentials.
            </h2>
          </div>
          {message && <div className="alert alert-success text-center">{message}</div>}
          {getErrors && <div className="alert alert-danger text-center">{getErrors}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usernameOrEmail" className="form-label">
                Username/Email
              </label>
              <input
                type="text"
                className="form-control"
                id="usernameOrEmail"
                name="usernameOrEmail"
                placeholder="Enter username or email"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                style={{ padding: '2rem' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                style={{ padding: '2rem' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-danger w-100"
              style={{ 
                padding: '15px', 
                border: '2px solid #FFD700', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px', 
                fontFamily: 'Roboto, sans-serif' 
              }}
            >
              Login
            </button>
          </form>
          <p 
            className="text-center mt-3" 
            style={{ fontSize: '1.2rem', color: 'white' }}
          >
            A New User?{' '}
            <span 
              style={{ color: '#6495ED', cursor: 'pointer' }} 
              onClick={goToRegister}
            >
              Register!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
