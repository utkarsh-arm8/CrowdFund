import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Import your Firebase configuration

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/'); // Redirect to the homepage upon successful login
      })
      .catch(() => {
        setError('Invalid email or password. Please try again.');
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1c1c24' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: '#2c2f32', padding: '20px', borderRadius: '8px', width: '300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2 style={{ textAlign: 'center', color: 'white' }}>Login</h2>
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#1c1c24', color: 'white' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#1c1c24', color: 'white' }}
          required
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4a4ae5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
        <p style={{ textAlign: 'center', color: '#aaa', marginTop: '10px' }}>
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: '#4a4ae5', cursor: 'pointer' }}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
