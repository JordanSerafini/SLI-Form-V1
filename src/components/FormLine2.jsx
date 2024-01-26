import { useState } from "react";
import RatingSmiley from "./Rating-Smiley";

function FormLine2() {
  const [finalGrade, setFinalGrade] = useState("");
  const [generalSatisfaction, setGeneralSatisfaction] = useState("");
  const [recommendation, setRecommendation] = useState("");

  return (
    <div className="bg-white rounded-xl border-brownperso border-4 p-4 shadow-custom w-9/10 mt-10 flex flex-col gap-6 font-playfair">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold border-b-4 pb-4 border-brownperso p-2">
        4ème phase: Satisfaction globale
      </h2>
      <div className="flex w-full">
        <h3 className="text-xl font-bold w-9/10">
          1. D&apos;une manière générale, vous êtes:
        </h3>
        <RatingSmiley  />
      </div>


      <h3 className="text-xl font-bold mb-3">
        2. Note finale de Solution Logique sur 10
      </h3>
      <input
        type="number"
        className="border-2 rounded-lg p-2 text-brownperso font-playfair w-full"
        placeholder="Entrez une note entre 0 et 10"
        min={0}
        max={10}
        value={finalGrade}
        onChange={(e) => setFinalGrade(e.target.value)}
      />

      <div className="flex flex-row gap-4">
        <h3 className="text-xl font-bold mb-3 w-7/10">
          3. D&apos;une manière générale, est-ce que la Solution Logique répond
          à vos attentes ?
        </h3>
        <div className="flex justify-center space-x-8">
          <label className="flex items-center space-x-4">
            <input
              type="radio"
              name="generalSatisfaction"
              value="oui"
              checked={generalSatisfaction === "oui"}
              onChange={(e) => setGeneralSatisfaction(e.target.value)}
              className="form-radio h-5 w-5 text-green-600"
            />
            <span>Oui</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="generalSatisfaction"
              value="non"
              checked={generalSatisfaction === "non"}
              onChange={(e) => setGeneralSatisfaction(e.target.value)}
              className="form-radio h-5 w-5 text-red-600"
            />
            <span>Non</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">
          4.Quelles sont vos suggestions pour les améliorations à apporter ?
        </h3>
        <textarea
          className="border border-brownperso flex-1 p-2 w-full"
          placeholder="Vos commentaires..."
          rows="3"
        ></textarea>
      </div>
      <div className="flex flex-row gap-4">
        <h3 className="text-xl font-bold mb-3 w-7/10">
          5. Recommanderiez-vous Solution Logique auprès de vos connaissances ?
        </h3>
        <div className="flex justify-center space-x-8">
          <label className="flex items-center space-x-4">
            <input
              type="radio"
              name="recommendation"
              value="oui"
              checked={recommendation === "oui"}
              onChange={(e) => setRecommendation(e.target.value)}
              className="form-radio h-5 w-5 text-green-600"
            />
            <span>Oui</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="recommendation"
              value="non"
              checked={recommendation === "non"}
              onChange={(e) => setRecommendation(e.target.value)}
              className="form-radio h-5 w-5 text-red-600"
            />
            <span>Non</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default FormLine2;
