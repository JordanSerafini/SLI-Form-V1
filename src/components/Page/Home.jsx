import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = 'https://serene-tundra-37919-d1478ece3cff.herokuapp.com';

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        console.error('Token non trouvé dans le localStorage');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/getUtilisateurInfo`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoutez le token JWT dans l'en-tête de la requête
          },
        });
        console.log(response);
        console.log(response.data);

        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {userData && (
        <div>
          <h2>Informations de l&apos;utilisateur :</h2>
          <p>Nom : {userData.name}</p>
          <p>Email : {userData.email}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
