import { useContext } from 'react';
import RatingContext from '../../../context/RatingContext';
import HomeBtn from '../../Button/HomeBtn';
import logoTel from '../../../assets/logoTel.png';

function ClientDetail() {
  const { clientList } = useContext(RatingContext);
  const { clientId } = useContext(RatingContext);
  
  // Trouver le client dans la liste par son ID
  const client = clientList.find(client => client.id === clientId);

  if (!client) {
    return <p>Client non trouvé.</p>;
  }


  return (
    <div className="bg-cream h-full overflow-x-hidden flex flex-col items-center p-4">
      <h2>Détails du client</h2>
      <div className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2">
        <p><strong>Nom :</strong> {client.name} / {client.maininvoicingcontact_name} {client.maininvoicingcontact_firstname}</p>
        {client.maininvoicingcontact_phone && (
          <p>
            <strong>Téléphone :</strong>
            <a href={`tel:${client.maininvoicingcontact_phone}`}>
              <img src={logoTel} alt="logoTel" className="h-6 w-6 inline" />
              {client.maininvoicingcontact_phone}
            </a>
          </p>
        )}
        <p>
          <strong>Adresse:</strong> {client.maininvoicingaddress_address1} {client.maininvoicingaddress_address2} {client.maininvoicingaddress_zipCode} {client.maininvoicingaddress_city} {client.maininvoicingaddress_state}
        </p>
        {client.maininvoicingcontact_email && (
          <p><strong>Email :</strong> {client.maininvoicingcontact_email}</p>
        )}
      </div>
      <HomeBtn />
    </div>
  );
}

export default ClientDetail;
