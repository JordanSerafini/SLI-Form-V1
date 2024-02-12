import BackUrl from "../../../Axios/BackUrl";
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
        const response = await axios.get(`${BackUrl}/articlePG`);
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
  }, [showToast]);

  if (loading) {
    return <div>Chargement...</div>; 
  }


  return (
    <div>
      {itemList.length > 0 ? (
        <ul>
        {itemList.map((item, index) => (
          <li key={index}>
            <h3>{item.caption}</h3>
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
