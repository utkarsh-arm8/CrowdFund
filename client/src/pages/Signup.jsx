import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Import Firebase auth configuration

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful! You can now log in.');
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1c1c24',
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          backgroundColor: '#2c2f32',
          padding: '20px',
          borderRadius: '8px',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'white' }}>Signup</h2>
        {error && (
          <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #555',
            backgroundColor: '#1c1c24',
            color: 'white',
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #555',
            backgroundColor: '#1c1c24',
            color: 'white',
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#4a4ae5',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
