import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = 'https://serene-tundra-37919-d1478ece3cff.herokuapp.com';

function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Utilisez useEffect pour effectuer la requête lorsque le composant est monté
    const fetchUserData = async () => {
        const email = localStorage.getItem('email');
      try {
        const response = await axios.post(`${apiUrl}/getUtilisateurInfo`, {
          email: email
        });

        if (response.data) {
          // Si vous recevez des données valides, mettez-les dans l'état
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      }
    };

    // Appelez la fonction pour récupérer les données de l'utilisateur
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
          {/* Ajoutez d'autres informations de l'utilisateur ici si nécessaire */}
        </div>
      )}
    </div>
  );
}

export default Home;
