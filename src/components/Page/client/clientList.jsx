import axios from "axios";
import EBPurl from "../../../Axios/EBPurl";
import RatingContext from "../../../context/RatingContext";
import { useContext, useEffect, useState } from "react";

import HomeBtn from "../../Button/HomeBtn"

import logoTel from "../../../assets/logoTel.png";

function ClientList() {
  const { showToast } = useContext(RatingContext);
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 25;

  const [search, setSearch] = useState(""); 
  const [filteredClients, setFilteredClients] = useState([]); 



  // Fonction pour mettre à jour la liste filtrée à chaque fois que la recherche change
  useEffect(() => {
    const filtered = clientList.filter((client) =>
      client.Name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [search, clientList]);


// ------------------------------------- Fetch les listes des clients au chargement de la page --------------------------------------------------------
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

  // Fonction pour appeler un numéro de téléphone
  const callPhoneNumber = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  // Calculez le nombre total de pages
const totalPages = Math.ceil(clientList.length / clientsPerPage);

// Calculez les numéros de pages à afficher
const pageNumbers = [];
for (
  let i = Math.max(1, currentPage - 5);
  i <= Math.min(totalPages, currentPage + 5);
  i++
) {
  pageNumbers.push(i);
}

return (
  <div className="bg-cream h-full flex flex-col items-center">
    <h2>Liste des clients</h2>
    <input
      type="text"
      placeholder="Rechercher un client..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border-2 border-gray-300 rounded-lg p-2 m-4"
    />
    {loading ? (
      <p>Chargement...</p>
    ) : (
      <div className="justify-center items-center text-center shadow-custom pt-4 pb-8 flex flex-row flex-wrap font-playfair w-full gap-4">
        {(search.length > 0 ? filteredClients : currentClients).map((client, index) => (
          <div
            key={index}
            className="
            bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2  overflow-y-auto h-72 w-9/10
            md:w-4.5/10
            sm:0 sm:h-52

            "

          >
            <p>
              <strong>Nom :</strong> {client.Name} / {client.MainInvoicingContact_Name} {client.MainInvoicingContact_FirstName} {client.Id}
            </p>
            {(client.MainInvoicingContact_Phone || client.MainInvoicingContact_CellPhone) && (
              <div className="flex flex-col">
                <strong>Téléphone :</strong>
                <div className="flex flex-col flex-wrap gap-2">
                  {client.MainInvoicingContact_Phone && (
                    <div className="flex flex-row gap-2">
                      <img
                        src={logoTel}
                        alt="logoTel"
                        className="h-6 w-6"
                        onClick={() => callPhoneNumber(client.MainInvoicingContact_Phone)}
                      />
                      {client.MainInvoicingContact_Phone}
                    </div>
                  )}
                  {client.MainInvoicingContact_CellPhone && (
                    <div className="flex flex-row gap-2 ">
                      <img
                        src={logoTel}
                        alt="logoTel"
                        className="h-6 w-6"
                        onClick={() => callPhoneNumber(client.MainInvoicingContact_CellPhone)}
                      />
                      {client.MainInvoicingContact_CellPhone}
                    </div>
                  )}
                </div>
              </div>
            )}
            <p>
              <strong>Adresse:</strong> {client.MainInvoicingAddress_Address1} {client.MainInvoicingAddress_Address2} {client.MainInvoicingAddress_ZipCode} {client.MainInvoicingAddress_City} {client.MainInvoicingAddress_State}
            </p>
            {client.MainInvoicingContact_Email && (
              <p>
                <strong>Email :</strong> {client.MainInvoicingContact_Email}
              </p>
            )}
          </div>
        ))}
      </div>
    )}
    {search.length === 0 && (
      <ul className="flex flex-row gap-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active font-bold" : ""}`}
          >
            <button
              onClick={() => paginate(number)}
              className={`page-link ${currentPage === number ? "font-bold" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    )}
    <HomeBtn />
  </div>
);

}

export default ClientList;
