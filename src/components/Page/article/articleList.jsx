import { useContext, useState, useEffect } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";

function ArticleList() {
  const { loading, itemList, setItemList } = useContext(RatingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(itemList); // État local pour les éléments filtrés

  useEffect(() => {
    const filterItems = () => {
      const tempItems = itemList.filter((item) =>
        item.caption.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(tempItems);
    };

    filterItems();
  }, [search, itemList]); // Dépendances : se relance si search ou itemList change

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // La logique de pagination utilisera `filteredItems` pour afficher les éléments
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
              <li key={index} className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2 overflow-y-auto h-32 w-9/10 md:w-4.5/10 sm:0 mx-auto">
                <h3>{item.caption}</h3>
                <p>Prix: HT <span className="font-bold">{item.salepricevatexcluded}</span> TTC: <span className="font-bold">{item.salepricevatincluded}</span></p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-row gap-2">
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${currentPage === number ? "font-bold" : ""}`}>
                <button onClick={() => setCurrentPage(number)} className={`page-link ${currentPage === number ? "font-bold" : ""}`}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>Aucun article trouvé.</div>
      )}
      <HomeBtn />
    </div>
  );
}

export default ArticleList;
