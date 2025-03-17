import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [serverResponse, setServerResponse] = useState('');
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
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (res.status === 201) {
        setServerResponse(res.data.message);
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (err) {
      setGetErrors(err.response?.data?.message || 'An error occurred');
      console.error(err);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

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
            <h1 
              className="card-title" 
              style={{ fontFamily: 'Cinzel, serif', color: '#FFD700' }}
            >
              Welcome New Inquistor!
            </h1>
            <h2 
              className="card-subtitle mb-3" 
              style={{ fontFamily: 'Lora, serif', color: '#B0C4DE' }}
            >
              Please enter your new credentials.
            </h2>
          </div>
          {serverResponse && <div className="alert alert-success">{serverResponse}</div>}
          {getErrors && <div className="alert alert-danger">{getErrors}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input 
                name="username" 
                type="text" 
                placeholder="username" 
                value={formData.username} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                name="email" 
                type="email" 
                placeholder="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                name="password" 
                type="password"
                placeholder="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="form-control" 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-danger w-100" 
              style={{ 
                border: '2px solid #FFD700', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px', 
                fontFamily: 'Roboto, sans-serif' 
              }}
            >
              Sign Up
            </button>
          </form>
          <p 
            className="text-center mt-3" 
            style={{ fontSize: '1.2rem', color: 'white' }}
          >
            Already an User?{' '}
            <span 
              style={{ color: '#6495ED', cursor: 'pointer' }} 
              onClick={goToLogin}
            >
              Login!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
