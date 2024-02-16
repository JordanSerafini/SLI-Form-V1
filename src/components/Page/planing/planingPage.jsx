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
  const [isFlip, setIsFlip] = useState(false);

  // ---------------------------------------------  Fonction fermeture de la modal  ---------------------------------------------------------------------
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //--------------------------- ------------------ Fonction Suppresion d'un événement  ---------------------------------------------------------------------
  const handleDeleteEvent = async (eventId) => {
    try {
      // Appeler votre API back-end pour supprimer l'événement avec l'ID spécifié
      await fetch(`${BackUrl}/deleteEvent/${eventId}`, {
        method: "DELETE",
      });
      fetchEventList();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
      // Afficher un message d'erreur ou gérer l'erreur d'une autre manière
    }
  };

  //--------------------------- ------------------ Filtre éléments et toast annonce ---------------------------------------------------------------------

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
      <div>
        Vous avez <strong>{filteredEvents.length}</strong> rdv le{" "}
        {selectedDate.toLocaleDateString("fr-FR")}
      </div>,
      {
        position: "top-right",
        autoClose: 1000,
      }
    );
  });

  //--------------------------- ------------------ Add un évenement ---------------------------------------------------------------------

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  // --------------------------------------------- Fonction pour formater une date-------------------------------------------------
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

  //----------------------------- Filtrer les événements pour afficher uniquement ceux de la date sélectionnée -------------------------
  const filteredEvents = eventList.rows.filter((event) => {
    const eventDate = new Date(event.startdatetime);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  //----------------------------- Handle le retournement de la carte -------------------------
  const handleFlip = () => {
    setIsFlip(!isFlip);
  };
  //------------------------------------ Mappez les données de chaque événement dans des éléments JSX--------------------------------------
  const eventItems = filteredEvents.map((event) => {
    // Convertir la date de début et la date de fin en objets Date
    const startDate = new Date(event.startdatetime);
    const endDate = new Date(event.enddatetime);
    // Formater les dates au format souhaité
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    let image = "";
    switch (event.xx_type_tache) {
      case "rendez-vous":
        image = "/planing/rdvLogo.webp";
        break;
      case "intervention":
        image = "/planing/interventionLogo.webp";
        break;
      case "formation":
        image = "/planing/rdvLogo.webp";
        break;
      case "rdv tel":
        image = "/planing/rdvtelLogo.webp";
        break;
      default:
        image = "/planing/rdvLogo.webp";
    }

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
      
      /*----------------------------------------------------------- Card  -------------------------------------*/ 
      <div
        key={event.id}
        className={`overflow-y-auto border-2 border-10c rounded-xl shrink-0 flex flex-row w-72 h-52 ${cardColorClass}`}
        onClick={() => handleFlip(event.id)}

      >
        {isFlip ? (
          // ----------------------------------------------------- Contenu TRUE -------------------------------------
          <div className="w-8/10 flex flex-row items-center justify-center p-2">
            {event.workingduration_editedduration && <div>durée prévu: {event.workingduration_editedduration}</div> }
            <div className="text-white">Note: {event.notesclear}</div>
          </div>
        ) : (
          // ----------------------------------------------------- Contenu FALSE -------------------------------------
          <>
            <div
              className="w-8/10 flex flex-row items-center justify-center p-2 "
            >
              { /*----------------------------------------------------- Card Image -------------------------------------*/ }
              <img
                src={image}
                alt={event.caption}
                className="w-full h-7/10 border-2 border-3c"
              />
            </div>
            { /*----------------------------------------------------- Card  content-------------------------------------*/ }

            <div className="text-gray-100 text-center text-xs flex flex-col items-center justify-center">
              <p className="border-b-2 border-6c pb-2 mb-2 font-bold">
                {event.caption}
              </p>
              <p>
                Du {formattedStartDate} au {formattedEndDate}
              </p>
              <p>{event.workingduration_editedduration}</p>
              { /*----------------------------------------------------- DEL BTN -------------------------------------*/ }
              <button
                className="mt-4"
                onClick={() => handleDeleteEvent(event.id)}
              >
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
          </>
        )}
      </div>
    );
  });

  {
    /* ------------------------------------------------  RETURN PRINCIPAL  --------------------------------------------------------------------- */
  }
  return (
    <div className="bg-3c h-[100vh] w-[100vw] overflow-x-hidden flex flex-col items-center justify-start">
      {/* ------------------------------------------------  ENTETE  --------------------------------------------------------------------- */}

      <h2
        className="
      text-center border-7c border-2 w-9.5/10 mx-auto bg-blue-dark rounded-xl mt-2 bg-white
      "
      >
        Liste des événements du {selectedDate.toLocaleDateString("fr-FR")}
      </h2>
      {/* ------------------------------------------------  CALENDAR  --------------------------------------------------------------------- */}
      <div className="w-9.5/10 mt-4 h-4.5/10">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="fr-FR"
          className={
            "bg-white p-4 rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-2 w-10/10"
          }
        />
      </div>

      {/* ------------------------------------------------  EVENT CARD LIST   --------------------------------------------------------------------- */}
      <div className="flex flex-row w-full overflow-x-auto py-4 gap-4 p-2">
        {eventItems.length > 0 ? (
          eventItems
        ) : (
          <p>Aucun événement prévu pour cette date.</p>
        )}
      </div>

      {/* ------------------------------------------------  HOME BUTTON   --------------------------------------------------------------------- */}
      <HomeBtn />
      {/* ------------------------------------------------  ADD BTN   --------------------------------------------------------------------- */}

      <button
        className="border-2 border-9c bg-white p-2 shadow-lg fixed  transform -translate-x-1/2 left-1/2 bottom-4 rounded-full "
        onClick={handleAddEvent}
      >
        +
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
}

export default PlaningPage;
