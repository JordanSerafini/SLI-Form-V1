import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

function PrivateRoute({ element }) {
  const jwt = localStorage.getItem('token');
  //console.log(jwt);

  //const isAuthenticated = true;

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

