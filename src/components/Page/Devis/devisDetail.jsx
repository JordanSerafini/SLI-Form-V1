import  { useContext, useState } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";

function DevisDetail() {
  const { devis, removeItemFromDevis, setDevis, itemList } = useContext(RatingContext);
  const [selectedItem, setSelectedItem] = useState("");
  const [searchInput, setSearchInput] = useState(""); 

  const addToDevis = (selectedItem) => {
    const newItem = itemList.find((item) => item.caption === selectedItem);
    setDevis((currentDevis) => ({
      ...currentDevis,
      items: [...currentDevis.items, newItem],
    }));
  };

  const handleRemoveItem = (index) => {
    removeItemFromDevis(index);
  };

  const total =
    devis.items?.reduce(
      (acc, item) => acc + parseFloat(item.salepricevatincluded),
      0
    ) || 0;

  return (
    <div className="bg-cream min-h-[100vh] overflow-x-hidden flex flex-col items-center p-4">
      <h1 className="bg-white rounded-xl justify-center items-center w-9.5/10 border-brownperso border-4 p-1 shadow-custom mt-4 flex flex-col font-playfair  gap-4">
        Mr Robert David
      </h1>
      <div className="bg-white rounded-xl min-h-[80vh] w-9.5/10 border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair text-sm">
        {devis.items && devis.items.length > 0 ? (
          <ul className="flex flex-col gap-2 p-1">
            {devis.items.map((item, index) => (
              <li
                key={index}
                className="border-b-2 pb-2 border-blue-light flex-row flex items-center gap-2 justify-between  w-9.5/10 mx-auto "
              >
                <div className="border-r-2 border-blue-light p-1 w-6/10 overflow-auto">
                  {item.caption}
                </div>
                <div>{item.salepricevatincluded}</div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  style={{ marginLeft: "10px" }}
                  className="p-1 text-red-700 border-red-700 border-2 rounded-full bg-red-200 h-6 w-6 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun article dans le devis.</p>
        )}
        <div>total: {total.toFixed(2)}€</div>
      </div>
      <input
        type="text"
        placeholder="Rechercher un article"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // Mettre à jour la valeur de recherche
        className="mt-2 mb-2 p-2 w-6/10"
      />
      <select className="mt-2 w-6/10" value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
        <option>Sélectionner un article</option>
        {itemList.filter((item) => item.caption.toLowerCase().includes(searchInput.toLowerCase())).map((item, index) => (
          <option key={index} value={item.caption}>
            {item.caption} - {item.salepricevatincluded}
          </option>
        ))}
      </select>
      <div className="" onClick={() => addToDevis(selectedItem)}>+</div>
      <HomeBtn />
    </div>
  );
}

export default DevisDetail;
