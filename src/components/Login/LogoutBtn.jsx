import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimez le token JWT
        localStorage.removeItem('token');

        // Redirigez l'utilisateur vers la page de connexion
        navigate('/login');
    };

    return (
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 " onClick={handleLogout}>Déconnexion</button>
    );
};

export default LogoutBtn;
