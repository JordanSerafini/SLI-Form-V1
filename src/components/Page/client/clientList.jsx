import  { useContext, useState, useMemo } from 'react';
import RatingContext from '../../../context/RatingContext';
import useDebounce from '../../../hooks/useDebounce';
import HomeBtn from '../../Button/HomeBtn';
import logoTel from '../../../assets/logoTel.png';

function ClientList() {
  const { clientList, loading } = useContext(RatingContext); // Assurez-vous que clientList est bien initialisé dans votre contexte
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500); // Utilisation du hook personnalisé pour le délai de recherche

  const clientsPerPage = 25; // Nombre de clients par page

  // Filtrage des clients basé sur la recherche délaiée
  const filteredClients = useMemo(() => clientList.filter(client =>
    client.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  ), [debouncedSearch, clientList]);

  // Pagination des clients après filtrage
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = useMemo(() => filteredClients.slice(indexOfFirstClient, indexOfLastClient),
    [indexOfFirstClient, indexOfLastClient, filteredClients]);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  // Génération des numéros de page pour la pagination
  const pageNumbers = useMemo(() => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      ) : currentClients.length > 0 ? (
        <div className="justify-center items-center text-center shadow-custom pt-4 pb-8 flex flex-row flex-wrap font-playfair w-full gap-4">
          {currentClients.map((client, index) => (
            
             <div
              key={index}
              className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2 overflow-y-auto h-72 w-9/10 md:w-4.5/10 sm:0 sm:h-52"
            >
              <p>
                <strong>Nom :</strong> {client.name} / {client.maininvoicingcontact_name} {client.maininvoicingcontact_firstname} {client.Id}
              </p>
              {(client.maininvoicingcontact_phone || client.maininvoicingcontact_cellphone) && (
                <div className="flex flex-col">
                  <strong>Téléphone :</strong>
                  <div className="flex flex-col flex-wrap gap-2">
                    {client.maininvoicingcontact_phone && (
                      <div className="flex flex-row gap-2">
                        <img
                          src={logoTel}
                          alt="logoTel"
                          className="h-6 w-6"
                          onClick={() => window.open(`tel:${client.maininvoicingcontact_phone}`)}
                        />
                        {client.maininvoicingcontact_phone}
                      </div>
                    )}
                    {client.maininvoicingcontact_cellphone && (
                      <div className="flex flex-row gap-2 ">
                        <img
                          src={logoTel}
                          alt="logoTel"
                          className="h-6 w-6"
                          onClick={() => window.open(`tel:${client.maininvoicingcontact_cellphone}`)}
                        />
                        {client.maininvoicingcontact_cellphone}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <p>
                <strong>Adresse:</strong> {client.maininvoicingaddress_address1} {client.maininvoicingaddress_address2} {client.maininvoicingaddress_zipCode} {client.maininvoicingaddress_city} {client.maininvoicingaddress_state}
              </p>
              {client.maininvoicingcontact_email && (
                <p>
                  <strong>Email :</strong> {client.maininvoicingcontact_email}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun client trouvé.</p>
      )}
      {totalPages > 1 && (
        <ul className="flex flex-row gap-2">
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active font-bold' : ''}`}>
              <button onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'font-bold' : ''}`}>
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
