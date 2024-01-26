import Header from "./components/Header";
import FormLine from "./components/Form-Line";
import FormLine2 from "./components/FormLine2";
import FormId from "./components/Form-Id";

import { RatingProvider } from './context/RatingContext';


function App() {
  return (
    <RatingProvider>

    <div className="bg-cream">
    <Header />
    <div className="flex flex-col items-center justify-center w-full  text-blue-light">

      {/*---------- Formulaire d'identification ------------ */}

      <FormId />

      {/*---------- 1er Form ------------ */}
      <FormLine title="1ère Phase: qualification de vos besoins et proposition d'une solution">
        {"1. Compréhension de vos besoins par notre service commercial."}
        {"2. Solution proposée et clarté des explications."}
        {
          "3. Qualité relationnelle globale avec notre équipe commerciale (disponibilité, poncutalité)"
        }
      </FormLine>

      {/*---------- 2eme Form ------------ */}

      <FormLine title="2ème Phase: Information sur le suivi de la livraison">
        {"1. Délai du traitement de la demande."}
        {
          "2. Qualité des renseignements communiqués lors de la prise de rendez-vous."
        }
       
      </FormLine>

      {/*---------- 3eme Form ------------ */}
      <FormLine title="3ème Phase: Installation de la solution">
        {"1. Satisfaction sur le délai de la livraison."}
        {"2. Satisfaction sur la qualité de l'installation."}
        {"3. Installation terminée"}
      </FormLine>

      {/*---------- 4eme Form ------------ */}
      
      <FormLine2 />
    </div>
    </div>
    </RatingProvider>
  );
}

export default App;
