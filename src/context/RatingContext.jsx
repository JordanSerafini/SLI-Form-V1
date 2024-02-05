import React, { createContext, useState } from 'react';

// Création du contexte
const RatingContext = createContext();

// Composant fournisseur
export const RatingProvider = ({ children }) => {
  const [rateArray, setRateArray] = useState([]);


  const handleRatingSubmit = (ratingData) => {
    // Vérifiez si l'objet avec le même questionID et formID existe déjà
    const existingIndex = rateArray.findIndex(item => 
      item.questionID === ratingData.questionID && item.formID === ratingData.formID
    );
  
    let newArray = [];
  
    if (existingIndex !== -1) {
      // Remplacez l'objet existant par le nouveau
      newArray = rateArray.map((item, index) => 
        index === existingIndex ? ratingData : item
      );
    } else {
      // Ajoutez le nouvel objet à la fin du tableau
      newArray = [...rateArray, ratingData];
    }
  
    // Mettez à jour l'état avec le nouveau tableau
    setRateArray(newArray);
  };
  


  return (
    <RatingContext.Provider value={{ rateArray, setRateArray, handleRatingSubmit }}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContext;
