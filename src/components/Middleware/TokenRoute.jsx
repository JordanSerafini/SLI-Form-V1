import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const TokenRoute = ({ element: Component, ...rest }) => {
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

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
      // Affiche un message d'erreur dans la console si le token est invalide
      alert('Token invalide. Veuillez contacter votre commercial.');
      console.error('Token invalide. Veuillez contacter votre commercial.');
    }
  }, [isValid, isChecking]);

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
