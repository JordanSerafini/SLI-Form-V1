import backUrl from "../../../Axios/backUrl";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import RatingContext from "../../../context/RatingContext";

import HomeBtn from "../../Button/HomeBtn";

function ArticleList() {
  const { showToast } = useContext(RatingContext);
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const response = await axios.get(`${backUrl}/articlePG`);
        //console.log(response.data.rows[10].caption);
        setItemList(response.data.rows); // Supposer que response.data est un tableau d'articles
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des articles :", error);
        showToast("Erreur lors de la récupération de la liste des articles", {
          type: "error",
        });
        setLoading(false);
      }
    };

    fetchItemList();
    console.log(itemList);
  }, [showToast, itemList]);

  if (loading) {
    return <div>Chargement...</div>; 
  }


  return (
    <div className="bg-cream h-full flex flex-col items-center justify-center">
    {itemList.length > 0 ? (
        <ul>
        {itemList.map((item, index) => (
          <li key={index}
          className="
            bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2 overflow-y-auto h-24 w-9/10
            md:w-4.5/10
            sm:0 
            "
          >
            <h3>{item.caption}</h3>
            <p>Prix: HT{item.salepricevatexcluded} TTC: {item.salepricevatincluded}</p>
          </li>
        ))}
      </ul>
      ) : (
        <div>Aucun article trouvé.</div>
      )}
      <HomeBtn />
    </div>
  );
  
}

export default ArticleList;
