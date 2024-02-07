import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const TokenRoute = ({ element: Component, ...rest }) => {
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    

    if (token) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setIsChecking(false);
  }, [location]);

  useEffect(() => {
    if (!isValid && !isChecking) {
      alert('Token invalide. Veuillez contacter votre commercial.');
      console.error('Token invalide. Veuillez contacter votre commercial.');
    }
  }, [isValid, isChecking]);

  if (isChecking) {
    return <div>Chargement...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default TokenRoute;
