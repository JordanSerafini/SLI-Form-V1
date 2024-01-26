import FormLine from "./components/Form-Line";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-whiteperso ">
      <FormLine title="1ère Phase: qualification de vos besoins et proposition d'une solution">
        {"1. Compréhension de vos besoins par notre service commercial."}
        {"2. Solution proposée et clarté des explications."}
        {"3. Qualité relationnelle globale avec notre équipe commerciale (disponibilité, poncutalité)"}
      </FormLine>
    </div>
  );
}

export default App;
