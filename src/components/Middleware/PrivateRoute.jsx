import { useEffect, useContext } from 'react';
import RatingContext from "../../context/RatingContext";
import PropTypes from 'prop-types';

function PrivateRoute({ element }) {
  const { showToast } = useContext(RatingContext);
  const jwt = localStorage.getItem('token');
  
  // Vérifie si le token est présent
  useEffect(() => {
    if (!jwt) {
      showToast("Vous devez être connecté pour accéder à cette page", { position: "top-center", autoClose: 5000 });
      navigateToLogin(); // Redirection vers la page de connexion
    }
  }, [jwt, showToast]);
  

  // Fonction pour effectuer la redirection vers la page de connexion
  const navigateToLogin = () => {
    window.location.replace('/login'); // Redirection via le changement de l'URL
  };

  // Rend le composant cible si le token est présent
  return element;
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
