import backUrl from "../../../Axios/backUrl";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import RatingContext from "../../../context/RatingContext";

import HomeBtn from "../../Button/HomeBtn";

function ArticleList() {
  const { showToast } = useContext(RatingContext);
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const response = await axios.get(`${backUrl}/articlePG`);
        setItemList(response.data.rows);
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset current page when search changes
  };

  const filteredItems = itemList.filter((item) =>
    item.caption.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-cream h-full overflow-x-hidden flex flex-col items-center">
      <input
        type="text"
        placeholder="Rechercher un article..."
        value={search}
        onChange={handleSearchChange}
        className="border-2 border-gray-300 rounded-lg p-2 m-4"
      />
      {currentItems.length > 0 ? (
        <>
          <ul>
            {currentItems.map((item, index) => (
              <li
                key={index}
                className="
                  bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2 overflow-y-auto h-32 w-9/10 md:w-4.5/10 sm:0 mx-auto
                "
              >
                <h3>{item.caption}</h3>
                <p>Prix: HT <span className="font-bold">{item.salepricevatexcluded}</span> TTC: <span className="font-bold">{item.salepricevatincluded}</span></p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-row gap-2">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${currentPage === number ? "font-bold" : ""}`}
              >
                <button
                  onClick={() => setCurrentPage(number)}
                  className={`page-link ${currentPage === number ? "font-bold" : ""}`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>Aucun article trouvé.</div>
      )}
      <HomeBtn /> {/* Ajout du composant HomeBtn ici */}
    </div>
  );
}

export default ArticleList;
