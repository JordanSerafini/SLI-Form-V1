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
        <div className="pt-4 bg-white rounded-xl border-brownperso border-4 p-4 shadow-custom mt-8 flex flex-col font-playfair "
        style={{width: "90%" , height: "100%"}} id="home
        ">
            <h2 className="">Bonjour <span className="font-bold"> {userData.name} </span></h2>
            
        </div>
      )}
    </div>
  );
}

export default Home;
