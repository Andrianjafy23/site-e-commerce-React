import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from 'axios';

function Users() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users', { email, password });

      if (response.data.success) {
        alert('Connexion réussie');
        // Redirigez vers la page admin ici, par exemple :
        window.location.href = '/adminUsers';
      } else {
        setErrorMessage('Email ou mot de passe incorrect');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion');
    }
  };

  return (
    <div className="container mt-5" style={{width:'30%'}}>
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Admin</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Users;
