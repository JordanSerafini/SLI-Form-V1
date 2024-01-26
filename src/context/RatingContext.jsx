import React, { createContext, useState } from 'react';

// Création du contexte
const RatingContext = createContext();

// Composant fournisseur
export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});

  const updateRating = (id, score) => {
    setRatings(prev => ({ ...prev, [id]: score }));
    //console.log(ratings);

  };

  return (
    <RatingContext.Provider value={{ ratings, setRatings, updateRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContext;
