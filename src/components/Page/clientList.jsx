import axios from "axios";
import EBPurl from "../../Axios/EBPurl";
import RatingContext from "../../context/RatingContext";
import { useContext, useEffect, useState } from "react";

function ClientList() {
  const { clientList, setClientList } = useContext(RatingContext);
  const { showToast } = useContext(RatingContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const response = await axios.get(`${EBPurl}/getAllCustomer`);
        setClientList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des clients :", error);
        showToast("Erreur lors de la récupération de la liste des clients", { type: "error" });
        setLoading(false);
      }
    };

    fetchClientList();
  }, [setClientList, showToast]);

  return (
    <div className="bg-cream h-screen flex flex-col items-center">
      <h2>Liste des clients</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="bg-white  text-center shadow-custom pt-4 pb-8 flex flex-col font-playfair w-10/10 gap-4 ">
        {clientList.map((client, index) => (
            <div key={index}>
              <p><strong>Name :</strong> {client.Name}</p>
              <p><strong>Id :</strong> {client.Id}</p>
              <p><strong>MainInvoicingAddress_Address1 :</strong> {client.MainInvoicingAddress_Address1}</p>
              <p><strong>MainInvoicingAddress_Address2 :</strong> {client.MainInvoicingAddress_Address2}</p>
              <p><strong>MainInvoicingAddress_ZipCode :</strong> {client.MainInvoicingAddress_ZipCode}</p>
              <p><strong>MainInvoicingAddress_City :</strong> {client.MainInvoicingAddress_City}</p>
              <p><strong>MainInvoicingAddress_State :</strong> {client.MainInvoicingAddress_State}</p>
              <p><strong>MainInvoicingAddress_CountryIsoCode :</strong> {client.MainInvoicingAddress_CountryIsoCode}</p>
              <p><strong>MainInvoicingContact_Civility :</strong> {client.MainInvoicingContact_Civility}</p>
              <p><strong>MainInvoicingContact_Name :</strong> {client.MainInvoicingContact_Name}</p>
              <p><strong>MainInvoicingContact_FirstName :</strong> {client.MainInvoicingContact_FirstName}</p>
              <p><strong>MainInvoicingContact_Phone :</strong> {client.MainInvoicingContact_Phone}</p>
              <p><strong>MainInvoicingContact_CellPhone :</strong> {client.MainInvoicingContact_CellPhone}</p>
              <p><strong>MainInvoicingContact_Fax :</strong> {client.MainInvoicingContact_Fax}</p>
              <p><strong>MainInvoicingContact_Email :</strong> {client.MainInvoicingContact_Email}</p>
              <p><strong>MainInvoicingContact_Function :</strong> {client.MainInvoicingContact_Function}</p>
              <p><strong>MainInvoicingAddress_WebSite :</strong> {client.MainInvoicingAddress_WebSite}</p>
              <p><strong>FirstInvoicingDate :</strong> {client.FirstInvoicingDate}</p>
              <p><strong>sysCreatedDate :</strong> {client.sysCreatedDate}</p>
              <p><strong>sysCreatedUser :</strong> {client.sysCreatedUser}</p>
              <p><strong>sysModifiedDate :</strong> {client.sysModifiedDate}</p>
              <p><strong>sysModifiedUser :</strong> {client.sysModifiedUser}</p>
              <p><strong>NotesClear :</strong> {client.NotesClear}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientList;
