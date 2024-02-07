import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const TokenRoute = ({ element: Component, ...rest }) => {
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const { addToast } = useToasts(); // Utilisation de react-toast-notifications

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    
    // Ici, vous pourriez ajouter une logique pour valider le token côté serveur
    // Pour cet exemple, nous considérons simplement la présence du token comme suffisante
    if (token) {
      // Validez le token ici (par exemple, en vérifiant son format ou en faisant une requête au serveur)
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setIsChecking(false);
  }, [location]);

  useEffect(() => {
    if (!isValid && !isChecking) {
      // Affiche un toast si le token est invalide
      addToast('Token invalide. Veuillez contacter votre commercial.', { appearance: 'error' });
    }
  }, [isValid, isChecking, addToast]);

  if (isChecking) {
    // Vous pouvez afficher un loader ici ou simplement null pendant la vérification
    return <div>Chargement...</div>;
  }

  if (!isValid) {
    // Redirige l'utilisateur si le token est invalide ou manquant
    return <Navigate to="/login" />;
  }

  // Rend le composant cible si le token est valide
  return <Component {...rest} />;
};

export default TokenRoute;
