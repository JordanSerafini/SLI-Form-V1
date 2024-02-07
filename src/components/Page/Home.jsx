import axios from "axios";
import { useState, useEffect } from "react";


import Header from "../Header/Header";
import LogoutBtn from "../Login/LogoutBtn";

const apiUrl = "https://serene-tundra-37919-d1478ece3cff.herokuapp.com"; // http://localhost:5000  // https://serene-tundra-37919-d1478ece3cff.herokuapp.com

function Home() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Token non trouvé dans le localStorage");
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
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        );
      }
    };

    fetchUserData();
  }, [token]);


  return (
    <div className="bg-cream h-screen flex flex-col items-center ">
      <Header />
      {userData && (
        <div className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-8 flex flex-col font-playfair w-9.5/10 h-8/10">
          <h2 className="border-b-2 pb-4 border-blue-strong">
            Bonjour <span className="font-bold">{userData.name},</span>
          </h2>

          <ul className="flex-col p-4 flex gap-2">
            Evenement de la semaine
            <li>premier evenement</li>
            <li>deuxieme evenement</li>
            <li>Troisieme evenement</li>
          </ul>
          
        </div>
      )}
      <LogoutBtn />
    </div>
  );
}

export default Home;
