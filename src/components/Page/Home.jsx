import axios from "axios";
import { useState, useEffect, useContext } from "react";
import RatingContext from "../../context/RatingContext";
import backUrl from "../../Axios/backUrl";

import Header from "../Header/Header";
import LogoutBtn from "../Login/LogoutBtn";

function Home() {
  const { showToast } = useContext(RatingContext);
  const [userData, setUserData] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailToSend, setEmailToSend] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("Token non trouvé dans le localStorage");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backUrl}/getUtilisateurInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (userData) {
      showToast(`Bienvenue ${userData.name}`, { position: "top-center", autoClose: 3000 });
    }
  }, [userData, showToast]);

  const sendForm = async () => {
    if (!emailToSend) {
      showToast("Veuillez entrer une adresse e-mail.", { position: "top-center", autoClose: 3000 });
      return;
    }
    if (!token) {
      showToast("Vous devez vous connecter pour envoyer le formulaire.", { position: "top-center", autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.post(
        `${backUrl}/sendForm`,
        { email: emailToSend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast(response.data.message, { position: "top-center", autoClose: 3000 });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire de satisfaction:", error);
    }
  };

  return (
    <div className="bg-cream h-screen flex flex-col items-center">
      <Header />
      {userData && (
        <div className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-8 flex flex-col font-playfair w-9.5/10 h-8/10">
          <div className="text-sm" onClick={() => setShowEmailInput(!showEmailInput)}>
            Envoyer un formulaire de satisfaction
          </div>
          {showEmailInput && (
            <div>
              <input
                type="email"
                placeholder="Adresse e-mail"
                value={emailToSend}
                onChange={(e) => setEmailToSend(e.target.value)}
              />
              <button onClick={sendForm}>Envoyer</button>
            </div>
          )}
        </div>
      )}
      <LogoutBtn />
    </div>
  );
}

export default Home;
