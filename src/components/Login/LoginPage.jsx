import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSLI from '../../assets/logoSLI.png';
import BackUrl from '../../Axios/backUrl';

const apiUrl = BackUrl; 


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          navigate('/home');
      } catch (error) {
          console.error('Échec de la connexion:', error);
  }
}

    return (
        <div className="bg-cream h-screen flex justify-center items-center ">
            <div className='flex flex-col gap-14'>
                <img src={LogoSLI} alt="Logo SLI" className="w-30 h-25 mx-auto border rounded-full" />
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border rounded-md p-2 w-full"
                            placeholder='Votre email'
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border rounded-md p-2 w-full"
                            placeholder='Votre mot de passe'
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
                        Connexion
                    </button>
                </form>
            </div>           
        </div>
    );
}

export default LoginPage;