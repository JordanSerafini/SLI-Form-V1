import { useEffect, useState, useContext } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function PlaningPage() {
  const { eventList, showToast } = useContext(RatingContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Filtrer les événements pour la date sélectionnée
    const filteredEvents = eventList.rows.filter((event) => {
      const eventDate = new Date(event.startdatetime);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });

    // Afficher le toast avec le nombre d'événements correspondant à la date sélectionnée
    showToast(
      `Vous avez ${
        filteredEvents.length
      } rdv le ${selectedDate.toLocaleDateString("fr-FR")}`,
      {
        position: "top-right",
        autoClose: 1500,
      },
      [setSelectedDate]
    );
  });

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
      <div
        key={event.id}
        className="bg-4c border-2 border-5c m-2 p-2 rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] flex pl-10"
      >
        <div className="flex flex-row justify-start">
          <p className="text-xs font-bold w-3/10 transform -rotate-45 text-1c">
            {event.xx_type_tache}
          </p>
          <div className="text-center">
            <p className="border-b-2 border-5c pb-2 mb-2 text-center text-lg font-bold ">
              {event.caption}
            </p>
            <p>
              Du {formattedStartDate} au {formattedEndDate}{" "}
            </p>
            <p>{event.workingduration_editedduration}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-3c h-[100vh] overflow-x-hidden flex flex-col items-center">
      <div className="w-9.5/10 mt-4">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="fr-FR"
          className={
            "bg-white p-4 rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
          }
        />
      </div>
      <div className="w-9.5/10">
        <h2 className="text-center  p-4 border-1c border-2 w-10/10 mx-auto bg-blue-dark rounded-xl m-4">
          Liste des événements du {selectedDate.toLocaleDateString("fr-FR")}
        </h2>
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
