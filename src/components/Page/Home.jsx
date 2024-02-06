import axios from "axios";
import { useState, useEffect } from "react";

import Header from "../Header/Header";

const apiUrl = 'https://serene-tundra-37919-d1478ece3cff.herokuapp.com';

function Home() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {

      if (!token) {
        console.error('Token non trouvé dans le localStorage');
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/getUtilisateurInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log(response);
        //console.log(response.data);

        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="bg-cream h-screen flex flex-col  items-center ">
        <Header />
    {userData && (
        <div>
            <h2>Bonjour {userData.name} !</h2>
            
        </div>
      )}
    </div>
  );
}

export default Home;
