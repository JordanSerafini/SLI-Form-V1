import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import RatingContext from "../../context/RatingContext";
import { useEffect } from 'react'; 

import PropTypes from 'prop-types';

function PrivateRoute({ element }) {
  const { showToast } = useContext(RatingContext);
  const jwt = localStorage.getItem('token');

  useEffect(() => {
    if (!jwt) {
      showToast("Vous devez vous connecter pour accéder à cette page.");
    }
  }, [jwt, showToast]);

  if (jwt) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
