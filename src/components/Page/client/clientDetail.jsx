import { useContext } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";
import logoTel from "../../../assets/logoTel.png";
import LeafletMap from "./leaflet";

//import BackBtn from '../../Button/BackBtn';

function ClientDetail() {
  const { clientList } = useContext(RatingContext);
  const { clientId } = useContext(RatingContext);




  // Trouver le client dans la liste par son ID
  const client = clientList.find((client) => client.id === clientId);
  const addressParts = [
    client.maininvoicingaddress_address1,
    client.maininvoicingaddress_zipCode,
    client.maininvoicingaddress_city,
    client.maininvoicingaddress_state
  ];
  
  const address = addressParts.filter(part => part != null && part !== '').join(' ');  
  
  if (!client) {
    return <p>Client non trouvé.</p>;
  }

  return (
    <div className="bg-cream h-[100vh] overflow-x-hidden flex flex-col items-center p-4">
      <div className="bg-white h-9.5/10 rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2">
        <p>
          <strong>Nom :</strong> {client.name} /{" "}
          {client.maininvoicingcontact_name}{" "}
          {client.maininvoicingcontact_firstname}
        </p>
        {client.maininvoicingcontact_phone && (
          <p className="">
            <a href={`tel:${client.maininvoicingcontact_phone}`}>
              <img src={logoTel} alt="logoTel" className="h-6 w-6 inline mr-2" />
              {client.maininvoicingcontact_phone}
            </a>
          </p>
        )}
        <p>
          <strong>Adresse:</strong> {client.maininvoicingaddress_address1}{" "}
          {client.maininvoicingaddress_address2}{" "}
          {client.maininvoicingaddress_zipCode}{" "}
          {client.maininvoicingaddress_city} {client.maininvoicingaddress_state}
        </p>
        {client.maininvoicingcontact_email && (
          <p className="">
          <strong>Email :</strong> 
          <a href={`mailto:${client.maininvoicingcontact_email}`} className="text-blue-strong hover:text-blue-light">
            {client.maininvoicingcontact_email}
          </a>
        </p>
        )}
        < LeafletMap address={address} />
      </div>
      <HomeBtn />
    </div>
  );
}

export default ClientDetail;
