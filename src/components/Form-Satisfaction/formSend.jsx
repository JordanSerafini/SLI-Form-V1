import { useContext } from 'react';
import axios from 'axios';

import RatingContext from '../../context/RatingContext';

const apiUrl = 'https://serene-tundra-37919-d1478ece3cff.herokuapp.com';

function FormSend() {
  const { user, commentArray, rateArray } = useContext(RatingContext);

  const handleFormSubmit = async () => {
    const confirmation = window.confirm('Souhaitez-vous valider ce formulaire ?');

    if (confirmation) {
      try {
        const response = await axios.post(`${apiUrl}/insertData`, {
          user,
          questions: rateArray,
          comments: commentArray,
        });

        if (response.status === 200) {
          alert('Données envoyées avec succès.');
        } else {
          console.error('Erreur lors de la requête POST :', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handleFormSubmit}>Envoyer les données</button>
    </div>
  );
}

export default FormSend;



// https://localhost:5000     https://serene-tundra-37919-d1478ece3cff.herokuapp.com
