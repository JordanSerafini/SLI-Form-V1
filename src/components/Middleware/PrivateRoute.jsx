import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

function PrivateRoute({ element }) {
  // Récupère le JWT depuis le localStorage avec la clé 'token'
  //const jwt = localStorage.getItem('token');

  const isAuthenticated = true;

  if (isAuthenticated) {
      return element;
  } else {
     
      return <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;

