import { Navigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import RatingContext from "../../context/RatingContext";
import PropTypes from 'prop-types';

function PrivateRoute({ element }) {
  const { showToast } = useContext(RatingContext);
  const jwt = localStorage.getItem('token');

  useEffect(() => {
    // Vérifier si le token est présent dans le header Authorization
    const tokenFromHeader = getTokenFromHeader();

    // Si le token est présent dans le header, afficher un message
    if (tokenFromHeader) {
      showToast("Vous avez été redirigé vers cette page avec un token.");
    } else {
      // Si aucun token n'est présent dans le header, rediriger vers la page de connexion
      showToast("Vous devez vous connecter pour accéder à cette page.");
      navigateToLogin(); // Redirection vers la page de connexion
    }
  }, [showToast]);

  // Fonction pour effectuer la redirection vers la page de connexion
  const navigateToLogin = () => {
    return <Navigate to="/login" />;
  };

  // Rend le composant cible si le token est présent
  return element;
}

// Fonction utilitaire pour extraire le token du header Authorization
const getTokenFromHeader = () => {
  const authHeader = localStorage.getItem('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
