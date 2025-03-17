import React, { useContext, useState } from 'react';
import { AuthContext } from '../authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from './config';

const CreateTask = () => {
  const { jsonwebtoken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [serverResponse, setServerResponse] = useState('');
  const [getErrors, setGetErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/task/createTask`,
        formData,
        {
          headers: { Authorization: `Bearer ${jsonwebtoken}` },
        }
      );
      setServerResponse(res.data.message || 'Task created successfully!');
      navigate('/');
    } catch (err) {
      setGetErrors(err.response?.data?.message);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container my-5">
      <div
        className="card mx-auto"
        style={{
          maxWidth: '600px',
          background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
          border: '2px solid #cfcdc1',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
          borderRadius: '15px',
          padding: '40px'
        }}
      >
        <h1
          className="text-center mb-4"
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '2.5rem',
            color: '#FFD700',
            letterSpacing: '2px'
          }}
        >
          Create A Task
        </h1>
        {getErrors && (
          <div className="alert alert-danger text-center">
            {getErrors}
          </div>
        )}
        {serverResponse && (
          <div className="alert alert-success text-center">
            {serverResponse}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label"
              style={{ color: '#B0C4DE', fontFamily: 'Lora, serif', fontSize: '1.1rem' }}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="form-control"
              style={{
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                border: '2px solid #708090',
                borderRadius: '8px'
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label"
              style={{ color: '#B0C4DE', fontFamily: 'Lora, serif', fontSize: '1.1rem' }}
            >
              Task Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task details"
              rows="5"
              className="form-control"
              style={{
                padding: '1rem',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                border: '2px solid #708090',
                borderRadius: '8px'
              }}
            ></textarea>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger"
              style={{
                padding: '15px',
                border: '2px solid #FFD700',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
