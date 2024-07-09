import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem('auth', 'true');
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
  };

  return (
      <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Username:</label>
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div>
                  <label>Password:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <button type="submit">Login</button>
          </form>
      </div>
  );
};

export default Login;