import { useState } from "react";
import BackUrl from "../../Axios/backUrl";
import axios from "axios";

function Modal({ onClose }) {
  const [eventInfo, setEventInfo] = useState({
    caption: "",
    startDateTime: "",
    endDateTime: "",
    expectedDuration: "",
    achievedDuration: "",
    colleagueId: "",
    notesClear: "",
    xx_type_tache: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    for (const key in eventInfo) {
      if (!eventInfo[key]) {
        alert("Veuillez remplir tous les champs");
        return;
      }
    }

    try {
      const response = await axios.post(`${BackUrl}/insertEvent`, eventInfo);

      if (response.status === 200) {
        // Si la requête a réussi, fermer le modal
        alert("Événement ajouté avec succès.");
        onClose();
      } else {
        // Si la requête a échoué, afficher une erreur
        alert("Erreur lors de l'ajout de l'événement.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
      alert("Erreur lors de l'envoi de la requête.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      [name]: value,
    }));
  };

  const handleCloseClickModal = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cream">
      <div className="w-9.5/10 bg-white p-2 rounded-lg shadow-lg border-2 border-10c">
        <h3 className="text-center mb-4 text-10c border-b-2 pb-4 border-10c">
          Ajout d&apos;un évenement
        </h3>
        <form onSubmit={handleSubmit} className="p-2 ">
          <input
            type="text"
            name="caption"
            value={eventInfo.caption}
            onChange={handleChange}
            placeholder="Nom de l'événement"
          />
          <input
            type="datetime-local"
            name="startDateTime"
            value={eventInfo.startDateTime}
            onChange={handleChange}
            placeholder="Date et heure de début"
          />
          <input
            type="datetime-local"
            name="endDateTime"
            value={eventInfo.endDateTime}
            onChange={handleChange}
            placeholder="Date et heure de fin"
          />
          <input
            type="number"
            name="expectedDuration"
            value={eventInfo.expectedDuration}
            onChange={handleChange}
            placeholder="Durée prévue (heures)"
          />
          <input
            type="number"
            name="achievedDuration"
            value={eventInfo.achievedDuration}
            onChange={handleChange}
            placeholder="Durée effective (heures)"
          />
          <input
            type="text"
            name="colleagueId"
            value={eventInfo.colleagueId}
            onChange={handleChange}
            placeholder="ID/Nom collègue"
          />
          <input
            type="text"
            name="notesClear"
            value={eventInfo.notesClear}
            onChange={handleChange}
            placeholder="Notes"
          />
          <select
            name="xx_type_tache"
            value={eventInfo.xx_type_tache}
            onChange={handleChange}
          >
            <option value="">Sélectionnez le type de tâche</option>
            <option value="rendez-vous">Rendez-vous</option>
            <option value="intervention">Intervention</option>
            <option value="formation">Formation</option>
            <option value="rdv tel">Rdv tel</option>
          </select>
          <div className="flex flex-row  items-center justify-between mt-4 gap-">
            <button
              className=" text-3c border-2 border-9c p-2 bg-2c rounded-md w-4/10"
              type="submit"
            >
              Ajouter
            </button>
            <button
              className="text-10c border-2 border-10c p-2 rounded-md w-4/10"
              type="button"
              onClick={handleCloseClickModal}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
