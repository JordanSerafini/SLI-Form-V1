import axios from "axios";
import EBPurl from "../../Axios/EBPurl";
import RatingContext from "../../context/RatingContext";
import { useContext, useEffect, useState } from "react";

function ClientList() {
  const { showToast } = useContext(RatingContext);
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 50;

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const response = await axios.get(`${EBPurl}/getAllCustomer`);
        setClientList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la liste des clients :",
          error
        );
        showToast("Erreur lors de la récupération de la liste des clients", {
          type: "error",
        });
        setLoading(false);
      }
    };

    fetchClientList();
  }, [showToast]);

  // Calcule l'index du premier et du dernier client de la page actuelle
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clientList.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  // Change de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-cream h-screen flex flex-col items-center">
      <h2>Liste des clients</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="justify-center items-center  text-center shadow-custom pt-4 pb-8 flex flex-row flex-wrap font-playfair w-10/10 gap-4 ">
          {/* Pagination */}
          <ul className="flex flex-row gap-2">
            {Array.from({
              length: Math.ceil(clientList.length / clientsPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
          {currentClients.map((client, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair w-3/10"
            >
              <p>
                <strong>Nom :</strong> {client.Name} /{" "}
                {client.MainInvoicingContact_Name}{" "}
                {client.MainInvoicingContact_FirstName}
                {client.Id}
              </p>
              <p>
                <strong>Téléphone :</strong> {client.MainInvoicingContact_Phone}{" "}
                {client.MainInvoicingContact_CellPhone}
              </p>
              <p>
                <strong>Adresse de facturation principale (Adresse1) :</strong>{" "}
                {client.MainInvoicingAddress_Address1}
                {client.MainInvoicingAddress_Address2}{" "}
                {client.MainInvoicingAddress_ZipCode}{" "}
                {client.MainInvoicingAddress_City}{" "}
                {client.MainInvoicingAddress_State}
              </p>

              <p>
                <strong>Email :</strong> {client.MainInvoicingContact_Email}
              </p>
              <p>
                <strong>Fonction :</strong>{" "}
                {client.MainInvoicingContact_Function}
              </p>
              <p>
                <strong>WebSite :</strong> {client.MainInvoicingAddress_WebSite}
              </p>

              <p>
                <strong>sysCreatedUser :</strong> {client.sysCreatedUser}
              </p>

              <p>
                <strong>Notes :</strong> {client.NotesClear}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientList;
