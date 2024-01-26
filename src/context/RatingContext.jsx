import React, { createContext, useState } from 'react';

// Création du contexte
const RatingContext = createContext();

// Composant fournisseur
export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState([]);
  
  const handleRatingSubmit = (ratingData) => {
    setRatings([...ratings, ratingData]);
  };


  return (
    <RatingContext.Provider value={{ ratings, setRatings }}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContext;
