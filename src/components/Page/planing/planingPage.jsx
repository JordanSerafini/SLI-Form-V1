import { useState, useContext, useEffect } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "../../modals/planingModal";
import BackUrl from "../../../Axios/backUrl";

function PlaningPage() {
  const { eventList, showToast, fetchEventList } = useContext(RatingContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
        // Appeler votre API back-end pour supprimer l'événement avec l'ID spécifié
        await fetch(`${BackUrl}/deleteEvent/${eventId}`, {
            method: 'DELETE'
        });
        fetchEventList();
    } catch (error) {
        console.error("Erreur lors de la suppression de l'événement :", error);
        // Afficher un message d'erreur ou gérer l'erreur d'une autre manière
    }
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
      []
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
            <button onClick={() => handleDeleteEvent(event.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
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
      <button 
            className="border-2 border-9c bg-white p-2 shadow-lg fixed  transform -translate-x-1/2 left-6 bottom-4 rounded-full "
            onClick={handleAddEvent}>
        +
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
}

export default PlaningPage;
