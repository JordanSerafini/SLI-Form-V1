import { useContext, useNavigate } from 'react';

import axios from 'axios';

import RatingContext from '../../context/RatingContext';

const apiUrl = 'https://serene-tundra-37919-d1478ece3cff.herokuapp.com';

function FormSend() {
  const { user, commentArray, rateArray } = useContext(RatingContext);
  const { showToast } = useContext(RatingContext);
  const navigate = useNavigate();


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
          showToast('Données envoyées avec succès.', { position: 'bottom-center', autoClose: 3000 });
          navigate('/login'); // Redirection vers la page de connexion après l'envoi réussi
        } else {
          console.error('Erreur lors de la requête POST :', response.statusText);
          showToast('Une erreur est survenue lors de l\'envoi des données.', { position: 'bottom-center', autoClose: 3000 });
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error.message);
        showToast('Une erreur est survenue lors de l\'envoi des données.', { position: 'bottom-center', autoClose: 3000 });
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



