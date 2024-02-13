import axios from "axios";
import { useState, useEffect, useContext } from "react";
import RatingContext from "../../context/RatingContext";
import backUrl from "../../Axios/backUrl";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import LogoutBtn from "../Login/LogoutBtn";

import logoTodo from "../../assets/logoTodo.png";
import clientLogo from "../../assets/clientLogo.png";
import starGif from "../../assets/starGif.gif";

function Home() {
  const { showToast } = useContext(RatingContext);
  const {helloFlag, setHelloFlag} = useContext(RatingContext);
  const { setClientList} = useContext(RatingContext);
  const { setLoading} = useContext(RatingContext);
  const { setItemList} = useContext(RatingContext);

  const [userData, setUserData] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailToSend, setEmailToSend] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const token = localStorage.getItem("token");


  const navigate = useNavigate();
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
    if (userData && helloFlag===false) {
      showToast(`Bonjour ${userData.name} ,`, {
        position: "bottom-center",
        autoClose: 3000,
      });
      setHelloFlag(true);
    }
  }, [userData, showToast, helloFlag, setHelloFlag]);

  // Envoi du formulaire de satisfaction
  
  useEffect(() => {
    if (userData) {
      const currentDate = new Date().toLocaleDateString("fr-FR");
      setCurrentDate(currentDate);
    }
  }, [userData]);
  
  const sendForm = async () => {
    if (!emailToSend || emailToSend === "") {
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
        position: "bottom-center",
        autoClose: 3000,
      });

      setShowEmailInput(false);
      setEmailToSend("");
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du formulaire de satisfaction:",
        error
      );
    }
  };

  const handleRedirect = () => {
    navigate("/client-list");
  };

  const articleRedirect = () => {
    navigate("/article-list");
  };


  // Fetch des données context
  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const response = await axios.get(`${backUrl}/customerPG`);
        //console.log("Liste des clients :", response.data.rows);
        setClientList(response.data.rows);
        //console.log("clientList fetched");
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la liste des clients :",
          error
        );
        showToast("Erreur lors de la récupération de la liste des clients", {
          type: "error",
        });
        setLoading(false);
      }
    };

    fetchClientList();
  }, [ ]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const response = await axios.get(`${backUrl}/articlePG`);
        setItemList(response.data.rows);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des articles :", error);
        showToast("Erreur lors de la récupération de la liste des articles", {
          type: "error",
        });
        setLoading(false);
      }
    };

    fetchItemList();
  }, []);

  return (
    <div className="bg-cream h-screen flex flex-col items-center">
      <Header />

      <div className="bg-white  text-center shadow-custom pt-4 pb-8 flex flex-col font-playfair w-10/10 gap-4 ">
        <div className="font-bold self-end pr-2 ">{currentDate}</div>
        <div className="text-sm">
          Bienvenue sur votre espace personnel{" "}
          <span className="font-bold">{userData && userData.name}</span>
        </div>
        <div className="text-sm">Que souhaitez vous faire?</div>
      </div>

      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {/*------------------------ Encard envoi formsend ----------------------------- */}
        {userData && (
          <div className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair w-9.5/10">
            <div
              className="text-sm flex items-center"
              onClick={() => setShowEmailInput(!showEmailInput)}
            >
              <img
                src={starGif}
                alt="Logo Formulaire"
                className="w-6 h-6 mr-2"
              />{" "}
              {/* Image ajoutée ici */}
              Envoyer un formulaire de satisfaction
            </div>
            {showEmailInput && (
              <div>
                <input
                  className="border-brownperso border-2 rounded-md p-1 mt-2 mr-4"
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
        {/*------------------------ Encard Clients ----------------------------- */}
        <div
          className="bg-white rounded-xl border-brownperso text-sm border-4 p-2 shadow-custom mt-4 flex flex-row font-playfair w-4.5/10"
          onClick={handleRedirect}
        >
          <img src={clientLogo} alt="Logo Formulaire" className="w-6 h-6 mr-2" />
          Consulter mes clients
        </div>
        {/*------------------------ Encard Planing ----------------------------- */}
        <div className="bg-white rounded-xl border-brownperso text-sm border-4 p-2 shadow-custom mt-4 flex flex-row font-playfair w-4.5/10" 
        onClick={articleRedirect}
        >
          <img src={logoTodo} alt="Logo Formulaire" className="w-6 h-6 mr-2" />{" "}
          Accéder aux articles
        </div>
      </div>

      <LogoutBtn />
    </div>
  );
}

export default Home;