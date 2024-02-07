import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'avoir installé axios
import { useToasts } from 'react-toast-notifications'; // Assurez-vous d'avoir installé react-toast-notifications
import BackUrl from '../../Axios/backUrl';

// Remplacez par l'URL de votre API
const API_URL = `${BackUrl}/validateToken`;

// eslint-disable-next-line react/prop-types
const TokenRoute = ({ element: Component, ...rest }) => {
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const { addToast } = useToasts();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (token) {
      // Valider le token côté serveur
      axios.get(API_URL, { params: { token } })
        .then(response => {
          // Suppose que l'API renvoie { isValid: true } pour un token valide
          if (response.data.isValid) {
            setIsValid(true);
            console.log("TokenRoute: token is valid");
          } else {
            setIsValid(false);
            console.log("TokenRoute: token is invalid or expired");
            addToast('Token invalide. Veuillez contacter votre commercial.', { appearance: 'error' });
          }
        })
        .catch(error => {
          console.error("Error during token validation:", error);
          setIsValid(false);
        })
        .finally(() => setIsChecking(false));
    } else {
      console.log("TokenRoute: no token provided");
      setIsValid(false);
      setIsChecking(false);
    }
  }, [location, addToast]);

  if (isChecking) {
    // Afficher un loader ou null pendant la vérification
    return <div>Chargement...</div>;
  }

  if (!isValid) {
    // Rediriger si le token est invalide ou manquant
    return <Navigate to="/login" />;
  }

  // Rendre le composant cible si le token est valide
  return <Component {...rest} />;
};

export default TokenRoute;
