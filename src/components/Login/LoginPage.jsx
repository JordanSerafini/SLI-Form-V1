import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://serene-tundra-37919-d1478ece3cff.herokuapp.com';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Hook pour la redirection
  
    const handleLogin = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
  
        const { token } = await response.json();
        //console.log('Token:', token);   
        localStorage.setItem('token', token);

        navigate('/form-satisfaction'); 

      } catch (error) {
        console.error('Échec de la connexion:', error);
      }
    };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default LoginPage;
