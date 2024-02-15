import { useContext } from "react";

import RatingContext from "../../../context/RatingContext";

import HomeBtn from "../../Button/HomeBtn";

function PlaningPage() {
  const { eventList } = useContext(RatingContext);

  // Vérifiez d'abord si eventList est défini et s'il contient des lignes
  if (!eventList || !eventList.rows || eventList.rows.length === 0) {
    return <div>Aucune donnée des événements disponible pour le moment.</div>;
  }

  // Mappez les données de chaque événement dans des éléments JSX
  const eventItems = eventList.rows.map((event) => {
    // Convertir la date de début et la date de fin en objets Date
    const startDate = new Date(event.startdatetime);
    const endDate = new Date(event.enddatetime);
    const nextreminder = new Date(event.nextreminder);

    // Formater les dates au format souhaité (par exemple, "YYYY-MM-DD HH:mm:ss")
    const formattedStartDate = startDate.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const formattedEndDate = endDate.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const formattedNextReminder = nextreminder.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Vérifier si la date de début est dans les deux prochains jours

    //const today = new Date();
    const today = new Date("2016-10-20");
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    const isStartDateNear = startDate <= twoDaysLater;

    return (
      <div
        key={event.id}
        className={`bg-white m-2 w-9.5/10 h-32 p-2 rounded-xl text-blue-strong overflow-auto ${
          isStartDateNear ? 'text-red-500 text-bold border-2 border-red-700' : ''
        }`}
      >
        <p className="text-center p-2"> {event.caption}</p>
        <p>Date de début: {formattedStartDate}</p>
        <p>Date de fin: {formattedEndDate}</p>
        <p>Prochain Rappel: {formattedNextReminder}</p>
      </div>
    );
  });

  return (
    <div className="bg-blue-light h-[100vh] overflow-x-hidden flex flex-col items-center">
      <h2 className="">Liste des événements</h2>
      <div className="w-9.5/10">
        {eventItems}
      </div>
      <HomeBtn />
    </div>
  );
}

export default PlaningPage;
