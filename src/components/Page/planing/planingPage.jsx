import React, { useState } from "react";
import { useContext } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function PlaningPage() {
  const { eventList } = useContext(RatingContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fonction pour formater une date
  const formatDate = (date) => {
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Filtrer les événements pour afficher uniquement ceux de la date sélectionnée
  const filteredEvents = eventList.rows.filter((event) => {
    const eventDate = new Date(event.startdatetime);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  // Mappez les données de chaque événement dans des éléments JSX
  const eventItems = filteredEvents.map((event) => {
    // Convertir la date de début et la date de fin en objets Date
    const startDate = new Date(event.startdatetime);
    const endDate = new Date(event.enddatetime);

    // Formater les dates au format souhaité
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    return (
      <div key={event.id} className="bg-white m-2 p-2 rounded-xl">
        <p>{event.caption}</p>
        <p>Date de début: {formattedStartDate}</p>
        <p>Date de fin: {formattedEndDate}</p>
      </div>
    );
  });

  return (
    <div className="bg-blue-light h-[100vh] overflow-x-hidden flex flex-col items-center">
      <div className="w-9.5/10 mt-4">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="fr-FR"
        />
      </div>
      <div className="w-9.5/10">
        <h2>Liste des événements du {selectedDate.toLocaleDateString("fr-FR")}</h2>
        {eventItems.length > 0 ? (
          eventItems
        ) : (
          <p>Aucun événement prévu pour cette date.</p>
        )}
      </div>
      
      <HomeBtn />
    </div>
  );
}

export default PlaningPage;
