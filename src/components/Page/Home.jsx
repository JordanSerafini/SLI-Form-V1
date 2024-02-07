import axios from "axios";
import { useState, useEffect, useContext } from "react";
import RatingContext from "../../context/RatingContext";
import backUrl from "../../Axios/backUrl";

import Header from "../Header/Header";
import LogoutBtn from "../Login/LogoutBtn";

import logoForm from "../../assets/logoForm.png";
import logoTodo from "../../assets/logoTodo.png";

function Home() {
  const { showToast } = useContext(RatingContext);
  const [userData, setUserData] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailToSend, setEmailToSend] = useState("");
  const token = localStorage.getItem("token");

  // Récupération des données de l'utilisateur
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
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        );
      }
    };

    fetchUserData();
  }, [token]);

  // Message de bienvenue
  useEffect(() => {
    if (userData) {
      showToast(`Bienvenue ${userData.name}`, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  }, [userData, showToast]);

  // Envoi du formulaire de satisfaction
  const sendForm = async () => {
    if (!emailToSend) {
      showToast("Veuillez entrer une adresse e-mail.", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }
    if (!token) {
      showToast("Vous devez vous connecter pour envoyer le formulaire.", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${backUrl}/sendForm`,
        { email: emailToSend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast(response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du formulaire de satisfaction:",
        error
      );
    }
  };

  return (
    <div className="bg-cream h-screen flex flex-col items-center">
      <Header />

      <div className="bg-white  p-2 shadow-custom pt-8 pb-8 flex flex-col font-playfair w-10/10 gap-2 ">
        <div className="text-sm">
          Bienvenue sur votre espace personnel{" "}
          <span className="font-bold">{userData && userData.name}</span>
        </div>
        <div className="text-sm">Que souhaitez vous faire?</div>
      </div>

      <div className="flex flex-col flex-wrap gap-4 items-center justify-center">
        {/*------------------------ Encard envoi formsend ----------------------------- */}
        {userData && (
          <div className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair w-full ">
            <div
              className="text-sm flex items-center"
              onClick={() => setShowEmailInput(!showEmailInput)}
            >
              <img
                src={logoForm}
                alt="Logo Formulaire"
                className="w-6 h-6 mr-2"
              />{" "}
              {/* Image ajoutée ici */}
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
        {/*------------------------ Encard envoi formsend ----------------------------- */}
        <div className="bg-white rounded-xl border-brownperso text-sm border-4 p-2 shadow-custom mt-4 flex flex-row font-playfair w-full ">
        <img
                src={logoTodo}
                alt="Logo Formulaire"
                className="w-6 h-6 mr-2"
              />{" "}
          Consulter mes rendez vous
        </div>
      </div>

      <LogoutBtn />
    </div>
  );
}

export default Home;
