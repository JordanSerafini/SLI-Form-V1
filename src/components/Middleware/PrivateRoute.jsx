import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import RatingContext from "../../context/RatingContext";
import { useEffect } from 'react'; 
import PropTypes from 'prop-types';

function PrivateRoute({ element }) {
  const { showToast } = useContext(RatingContext);
  const jwt = localStorage.getItem('token');

  useEffect(() => {
    // Vérifier si le token est présent dans l'URL en tant que paramètre
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromURL = queryParams.get('token');

    // Si le token est présent dans l'URL, afficher un message
    if (tokenFromURL) {
      showToast("Vous avez été redirigé vers cette page avec un token.");
    }

    // Vérifier si l'utilisateur est connecté
    if (!jwt && !tokenFromURL) {
      showToast("Vous devez vous connecter pour accéder à cette page.");
    }
  }, [jwt, showToast]);

  // eslint-disable-next-line no-undef
  if (jwt || tokenFromURL) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
