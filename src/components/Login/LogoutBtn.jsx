import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import RatingContext from "../../context/RatingContext";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const { showToast } = useContext(RatingContext);

    const handleLogout = () => {
        // Supprimez le token JWT
        localStorage.removeItem('token');

        // Affichez un message de déconnexion
        showToast('Vous avez été déconnecté avec succès');

        // Redirigez l'utilisateur vers la page de connexion
        navigate('/login');
    };

    return (
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 " onClick={handleLogout}>Déconnexion</button>
    );
};

export default LogoutBtn;
