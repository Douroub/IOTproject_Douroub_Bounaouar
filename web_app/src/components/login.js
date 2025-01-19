import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      // Ici, vous pouvez ajouter une logique d'authentification
      navigate('/dashboard', { state: { username } });
    } else {
      alert('Veuillez entrer un nom d’utilisateur et un mot de passe.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Connexion</h1>
      <input
        type="text"
        placeholder="Nom d’utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: '10px 0', padding: '8px' }}
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px 0', padding: '8px' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
        Se connecter
      </button>
    </div>
  );
}

export default Login;
