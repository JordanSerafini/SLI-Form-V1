import { useEffect, useState } from 'react';

// Hook pour retarder une valeur jusqu'à ce que le délai passé ne soit écoulé
function useDebounce(value, delay) {
  // État pour stocker la valeur différée
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Définir un délai pour mettre à jour la valeur différée après le délai spécifié
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Annuler le délai si la valeur change (également si le composant est démonté)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Ne réexécuter que si la valeur ou le délai change

  return debouncedValue;
}



export default useDebounce;
