import React, { createContext, useState, useMemo } from 'react';

const RatingContext = createContext();

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

  
  const averageRating = useMemo(() => {
    if (rateArray.length === 0) return 0; 

    const totalRating = rateArray.reduce((acc, current) => acc + current.rating, 0);
    const average = totalRating / rateArray.length; 
    if (average > 0 && average < 1.5) return "Très insatisfait";
    if (average >= 1.5 && average < 2.5) return "Insatisfait";
    if (average >= 2.5 && average < 3) return "Moyen";
    if (average >= 3 && average < 4.2) return "Satisfait";
    if (average >= 4.2 && average <= 5) return "Très satisfait";

    //return Math.ceil(average); 
  }, [rateArray]);

  return (
    <RatingContext.Provider value={{ rateArray, setRateArray, handleRatingSubmit, averageRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContext;
