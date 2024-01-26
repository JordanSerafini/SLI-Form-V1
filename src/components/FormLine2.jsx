import { useState } from "react";

function FormLine2() {
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setResponse(event.target.value);
  };

  return (
    <div className="bg-white rounded-xl border-brownperso border-4 p-4 shadow-custom w-9/10 mt-10 flex flex-col gap-6 font-playfair">
      <h3 className="text-xl font-bold mb-3">
        2. Note finale de Solution Logique sur 10
      </h3>
      <input
        type="number"
        className="border-2 rounded-lg p-2 text-brownperso font-playfair w-full"
        placeholder="Entrez une note entre 0 et 10"
        min={0}
        max={10}
      />
      <h3 className="text-xl font-bold mb-3">
        3. D&apos;une manière générale, est-ce que la Solution Logique répond à
        vos attentes ?
      </h3>

      {/* Utilisez flex pour centrer et space-x pour espacer les boutons */}
      <div className="flex justify-center space-x-28">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="response"
            value="oui"
            checked={response === "oui"}
            onChange={handleChange}
            className="form-radio h-5 w-5 text-green-600"
          />
          <span>Oui</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="response"
            value="non"
            checked={response === "non"}
            onChange={handleChange}
            className="form-radio h-5 w-5 text-red-600"
          />
          <span>Non</span>
        </label>
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
    </div>
  );
}

export default FormLine2;
