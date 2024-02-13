import { useContext, useState, useEffect, useMemo } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";

function ArticleList() {
  const { loading, itemList } = useContext(RatingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Filtrage des articles basé sur la recherche
    setFilteredItems(
      itemList.filter((item) =>
        item.caption.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, itemList]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Réinitialisation à la première page lors d'une nouvelle recherche
  };

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
          <ul className="flex flex-col md:flex-row md:flex-wrap">
            {currentItems.map((item, index) => (
              <li key={index} className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2 overflow-y-auto h-28 md:w-4.5/10 w-9/10  mx-auto">
                <h3>{item.caption}</h3>
                <p>Prix: HT <span className="font-bold">{item.salepricevatexcluded}</span> TTC: <span className="font-bold">{item.salepricevatincluded}</span></p>
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
        <ul className="flex flex-row gap-2">
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? "font-bold" : ""}`}>
              <button onClick={() => setCurrentPage(number)} className={`page-link ${currentPage === number ? "font-bold" : ""}`}>
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