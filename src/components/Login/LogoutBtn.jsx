import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import LogoDeco from '../../assets/logoDeco.png';

import RatingContext from "../../context/RatingContext";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const { showToast } = useContext(RatingContext);

    const handleLogout = () => {
        // Supprimez le token JWT
        localStorage.removeItem('token');

        // Affichez un message de déconnexion
        showToast('Vous avez été déconnecté avec succès' , { position: "bottom-right", autoClose: 1500});

        // Redirigez l'utilisateur vers la page de connexion
        navigate('/login');
    };

    return (
        <img src={LogoDeco} alt="Déconnexion" className="fixed bottom-0 right-0 m-4 cursor-pointer" onClick={handleLogout} />
    );
};

export default LogoutBtn;
