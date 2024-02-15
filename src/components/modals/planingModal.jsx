import { useState, useContext } from "react";
import RatingContext from "../../context/RatingContext";

function Modal() {
  const { onClose } = useContext(RatingContext);
  const [eventInfo, setEventInfo] = useState({
    caption: "",
    startDateTime: "",
    endDateTime: "",
    expectedDuration: 0,
    achievedDuration: 0,
    colleagueId: "",
    notesClear: "",
    xxTypeTache: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    if (
      !eventInfo.caption ||
      !eventInfo.startDateTime ||
      !eventInfo.endDateTime ||
      !eventInfo.expectedDuration ||
      !eventInfo.achievedDuration ||
      !eventInfo.colleagueId ||
      !eventInfo.notesClear ||
      !eventInfo.xxTypeTache
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Créez votre requête SQL pour insérer les données dans la base de données
    const query = `INSERT INTO event (Caption, StartDateTime, EndDateTime, ExpectedDuration_DurationInHours, AchievedDuration_DurationInHours, ColleagueId, NotesClear, xx_Type_Tache)
    VALUES ('${eventInfo.caption}', '${eventInfo.startDateTime}', '${eventInfo.endDateTime}', ${eventInfo.expectedDuration}, ${eventInfo.achievedDuration}, '${eventInfo.colleagueId}', '${eventInfo.notesClear}', '${eventInfo.xxTypeTache}')`;
    
    // Exécutez votre requête SQL (par exemple, à l'aide d'une bibliothèque de requêtes SQL)
    // Après avoir exécuté la requête, vous pouvez fermer le modal en appelant onClose du contexte
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Ajouter un événement</h2>
      <form onSubmit={handleSubmit}>
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
          placeholder="ID du collègue"
        />
        <input
          type="text"
          name="notesClear"
          value={eventInfo.notesClear}
          onChange={handleChange}
          placeholder="Notes"
        />
        <input
          type="text"
          name="xxTypeTache"
          value={eventInfo.xxTypeTache}
          onChange={handleChange}
          placeholder="Type de tâche"
        />
        <button type="submit">Ajouter</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
    </div>
  );
}

export default Modal;
