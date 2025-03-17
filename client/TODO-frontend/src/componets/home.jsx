import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

function Home() {
  const { user, jsonwebtoken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [getErrors, setGetErrors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserTasks() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/task/getTasks`, {
          headers: { Authorization: `Bearer ${jsonwebtoken}` },
        });
        setTasks(res.data.tasks);
      } catch (err) {
        setGetErrors("Failed to load tasks");
      }
    }
    getUserTasks();
  }, [jsonwebtoken]);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/task/${taskId}/deleteTask`, {
        headers: { Authorization: `Bearer ${jsonwebtoken}` },
      });
      window.location.reload();
    } catch (err) {
      setGetErrors(err.response?.data?.message || "An error occurred");
    }
  };

  const editTask = (taskId) => {
    navigate(`/editTask/${taskId}`);
  };

  return (
    <div className="container my-2">
      <header className="text-center py-4 border-bottom border-warning mb-4">

        {user ? (
          <>
          
            <h1 
            className="text-warning" 
            style={{ 
              textShadow: "0 0 0px #FFD700, 0 0 20px black" 
            }}
          >
            welcome {user.username} here are you task.
          </h1>
          
          
          </>
        ):(
          <>
          <h1 
            className="text-warning" 
            style={{ 
              textShadow: "0 0 0px #FFD700, 0 0 20px black" 
            }}
          >
          Here are your Tasks
        </h1>
          </>
        )}
      </header>
      {getErrors ? (
        <p className="text-danger text-center">{getErrors}</p>
      ) : (
        <div className="row">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="col-md-4 mb-4">
                <div 
                  className="card bg-dark text-light h-100 border-warning" 
                  style={{ borderWidth: '3px' }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 
                      className="card-title" 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => displayTask(task._id)}
                    >
                      {task.title}
                    </h5>
                    <p className="card-text flex-grow-1">
                      {task.description}
                    </p>
                    <div>
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => editTask(task._id)}
                      >
                        Edit Task
                      </button>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center fst-italic text-muted">
              There are no tasks to show.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
