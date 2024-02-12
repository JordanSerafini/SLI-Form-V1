import EBPurl from "../../../Axios/EBPurl";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import RatingContext from "../../../context/RatingContext";

function ArticleList() {
  const { showToast } = useContext(RatingContext);
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const response = await axios.get(`${EBPurl}/item`);
        setItemList(response.data); // Supposer que response.data est un tableau d'articles
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
  }, [showToast]);

  if (loading) {
    return <div>Chargement...</div>; // Ou toute autre indication de chargement que vous préférez
  }

  return (
    <div>
      {itemList.length > 0 ? (
        <ul>
          {itemList.map(item => (
            <li key={item.id}> 
              {item.name} 
            </li>
          ))}
        </ul>
      ) : (
        <div>Aucun article trouvé.</div>
      )}
    </div>
  );
}

export default ArticleList;
