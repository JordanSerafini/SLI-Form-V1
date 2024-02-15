import { useState, useContext, useEffect } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../../modals/planingModal";

function PlaningPage() {
  const { eventList, showToast } = useContext(RatingContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

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

    // Définir la classe de couleur en fonction du type de tâche
    let cardColorClass = "";
    switch (event.xx_type_tache) {
      case "rendez-vous":
        cardColorClass = "bg-7c";
        break;
      case "intervention":
        cardColorClass = "bg-8c";
        break;
      case "formation":
        cardColorClass = "bg-9c";
        break;
      default:
        cardColorClass = "bg-10c";
    }

    return (
      <div
        key={event.id}
        className={`overflow-y-auto border-2 border-10c  m-2 p-2 rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] flex pl-10 ${cardColorClass}`}
      >
        <div className="flex flex-row justify-start">
          <p className="text-xs font-bold w-3/10 transform -rotate-45 text-2c ">
            {event.xx_type_tache}
          </p>
          <div className="text-center  text-gray-100">
            <p className="border-b-2 border-6c pb-2 mb-2 text-center text-lg font-bold ">
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
      <h2 className="text-center  border-7c border-2 w-9.5/10 mx-auto bg-blue-dark rounded-xl mt-2 bg-white">
          Liste des événements du {selectedDate.toLocaleDateString("fr-FR")}
        </h2>
      <div className="w-9.5/10 mt-4 h-4.5/10">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="fr-FR"
          className={
            "bg-white p-4 rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-2"
          }
        />
      </div>
        
        <div className="">
          {eventItems.length > 0 ? (
            eventItems
          ) : (
            <p>Aucun événement prévu pour cette date.</p>
          )}
      </div>
      <HomeBtn />
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
}

export default PlaningPage;
