import Header from "../Header/HeaderForm";
import FormLine from "./Form-Line";
import FormLine2 from "./FormLine2";
import FormId from "./Form-Id";
import FormSend from "./formSend";
import axios from "axios";

import BackUrl from "../../Axios/backUrl";

import { useContext, useState, useEffect } from "react";
import RatingContext from "../../context/RatingContext";

import { RatingProvider } from "../../context/RatingContext";

function FormPage() {

    const [isValidToken, setIsValidToken] = useState(false);
  
    useEffect(() => {
      const fetchTokenValidity = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        if (token) {
          try {
            // Valider le token côté serveur
            const response = await axios.get(`${BackUrl.local}/validateToken?token=${token}`);
            if (response.data.isValid) {
              setIsValidToken(true);
            } else {
              setIsValidToken(false);
            }
          } catch (error) {
            console.error("Erreur lors de la validation du token:", error);
            setIsValidToken(false);
          }
        } else {
          setIsValidToken(false);
        }
      };
  
      fetchTokenValidity();
    }, []);
  
    if (!isValidToken) {
      return (
        <div>
          <p>Le token est invalide. Veuillez vérifier le lien.</p>
        </div>
      );
    }

  function TotalDisplay() {
    const { averageRating } = useContext(RatingContext);

    return (
      <div>
        <p>Avis général: {averageRating.comment}</p>
        <p>Note générale: {averageRating.average}</p>
      </div>
    );
  }

  return (
    <RatingProvider>
      <div className="bg-cream">
        <Header />
        <div className="flex flex-col items-center justify-center w-full  text-blue-light">
          {/*---------- Formulaire d'identification ------------ */}

          <FormId />

          {/*---------- 1er Form ------------ */}
          <FormLine
            title="1ère Phase: qualification de vos besoins et proposition d'une solution"
            formID="1"
          >
            {"1. Compréhension de vos besoins par notre service commercial."}
            {"2. Solution proposée et clarté des explications."}
            {
              "3. Qualité relationnelle globale avec notre équipe commerciale (disponibilité, poncutalité)"
            }
           
            
          </FormLine>

          {/*---------- 2eme Form ------------ */}

          <FormLine
            title="2ème Phase: Information sur le suivi de la livraison"
            formID="2"
          >
            {"1. Délai du traitement de la demande."}
            {
              "2. Qualité des renseignements communiqués lors de la prise de rendez-vous."
            }
          </FormLine>

          {/*---------- 3eme Form ------------ */}
          <FormLine title="3ème Phase: Installation de la solution" formID="3">
            {"1. Satisfaction sur le délai de la livraison."}
            {"2. Satisfaction sur la qualité de l'installation."}
            {"3. Installation terminée"}
          </FormLine>

          {/*---------- 4eme Form ------------ */}

          <FormLine2 formID="4" />
        </div>

        {/*---------- Total Display ------------ */}

        <div className=" gap-4 bg-white rounded-xl border-brownperso border-4 p-4 shadow-custom w-9/10 mt-10 flex flex-col font-playfair ">
          <TotalDisplay />
          <FormSend />
        </div>
      </div>
    </RatingProvider>
  );
}

export default FormPage;
