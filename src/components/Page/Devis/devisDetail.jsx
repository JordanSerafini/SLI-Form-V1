import { useContext } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";

function DevisDetail() {
  const { devis, removeItemFromDevis } = useContext(RatingContext);

  const handleRemoveItem = (index) => {
    removeItemFromDevis(index);
  };

  return (
    <div className="bg-cream min-h-[100vh] overflow-x-hidden flex flex-col items-center p-4">
      <h1 className="bg-white rounded-xl justify-center items-center w-9.5/10 border-brownperso border-4 p-1 shadow-custom mt-4 flex flex-col font-playfair  gap-4">
        Mr Robert David
      </h1>
      <div className="bg-white rounded-xl min-h-[80vh] w-9.5/10 border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair ">
        {devis.items && devis.items.length > 0 ? (
          <ul className="flex flex-col gap-2 p-1">
            {devis.items.map((item, index) => (
              <li 
              key={index}
              className="border-b-2 pb-2 border-blue-strong"
              >

                {item.caption}
                {item.salepricevatincluded}
                <button
                  onClick={() => handleRemoveItem(index)}
                  style={{ marginLeft: "10px" }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun article dans le devis.</p>
        )}
      </div>
      <HomeBtn />
    </div>
  );
}

export default DevisDetail;
