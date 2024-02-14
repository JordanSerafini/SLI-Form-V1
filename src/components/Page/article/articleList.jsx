import { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";

function ArticleList() {
  const { loading, itemList, devis, setDevis } = useContext(RatingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { setArticleId } = useContext(RatingContext);
  const navigate = useNavigate();

/*
  useEffect(() => {
    console.log(devis);
  }, [devis]);
  */

  
  const addToDevis = (newItem) => {
    setDevis(currentDevis => ({
      ...currentDevis,
      items: [...currentDevis.items, newItem] 
    }));
    alert("Article ajouté au devis");
  };
  
  
  
  

  const handleDetail = (articleId) => {
    setArticleId(articleId);
    navigate(`/article-detail/${articleId}`);
  };

  useEffect(() => {
    // Filtrage des articles basé sur la recherche
    setFilteredItems(
      itemList.filter((item) =>
        item.caption.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, itemList]);

  // Pagination des articles après filtrage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Génération des numéros de page pour la pagination
  const pageNumbers = useMemo(() => {
    let pages = [];
    const pageWindow = 5; // Nombre de pages à afficher dans la pagination
    let startPage = Math.max(currentPage - Math.floor(pageWindow / 2), 1);
    let endPage = Math.min(startPage + pageWindow - 1, totalPages);

    // Ajustement si on est aux extrémités de la liste des pages
    if (endPage - startPage + 1 < pageWindow) {
      startPage = Math.max(endPage - pageWindow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (loading) {
    return <div>Chargement...</div>;
  }


  

  return (
    <div className="bg-cream h-[100vh] overflow-x-hidden flex flex-col items-center">
      <div
        className="fixed top-0 bg-gradient-to-r from-blue-light to-blue-strong w-full flex justify-center box-shadow z-50"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" border-4 border-gray-300 rounded-lg p-2 m-4 z-10 bg-white"
        />
      </div>
      {currentItems.length > 0 ? (
        <>
          <ul className="flex flex-col md:flex-row md:flex-wrap mt-20">
            {currentItems.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2 overflow-y-auto h-32 md:w-4.5/10 w-9/10  mx-auto"
              >
                <h3>{item.caption}</h3>
                <p>
                  Prix: HT{" "}
                  <span className="font-bold">{item.salepricevatexcluded}</span>{" "}
                  TTC:{" "}
                  <span className="font-bold">{item.salepricevatincluded}</span>
                </p>
                <button
                  className="text-blue-light font-bold border-b-2 border-blue-light "
                  onClick={() => handleDetail(item.id)}
                >
                  Accéder au Détail
                </button>
                <button
                  className="text-green-500 font-bold"
                  onClick={() => addToDevis(item)}
                >
                  ajouter
                </button>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <ul className="flex flex-row gap-2">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "font-bold" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentPage(number)}
                    className={`page-link ${
                      currentPage === number ? "font-bold" : ""
                    }`}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <HomeBtn />
        </>
      ) : (
        <div>Aucun article trouvé</div>
      )}
    </div>
  );
}

export default ArticleList;
