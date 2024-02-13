import { useContext, useEffect } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";
//import BackBtn from "../../Button/BackBtn";
import { useLocation } from "react-router-dom";

function ArticleDetail() {
  const { itemList } = useContext(RatingContext);
  const { articleId } = useContext(RatingContext);
  const location = useLocation();
  const { updateLastPath } = useContext(RatingContext);

  useEffect(() => {
    updateLastPath(location.pathname);
  }, [location, updateLastPath]);

  // Trouvez l'article en fonction de l'ID
  const article = itemList.find((item) => item.id.toString() === articleId);

  if (!article) {
    return <div>Article non trouvé.</div>;
  }

  return (
    <div className="bg-cream h-[100vh]  overflow-x-hidden flex flex-col items-center p-4">
      <div className="item-center bg-white h-9.5/10 w-9.5/10 rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2">
        <h2 className="font-bold border-b-2 border-blue-strong pb-2 pt-2">
          {article.caption} 
        </h2>
        <div className="pt-6 flex flex-col  items-center gap-2">
          <p>
            Prix HT:{" "}
            <span className="font-bold">{article.salepricevatexcluded}</span>
          </p>
          <p>
            Prix TTC:{" "}
            <span className="font-bold">{article.salepricevatincluded}</span>
          </p>
          <p>Stock: {article.realstock}</p>
          <p><span className="font-bold">Description:</span>{article.descomclear}</p>
          <p>Prix achat: {article.purchaseprice}</p>
        </div>
      </div>
      <HomeBtn />
    </div>
  );
}

export default ArticleDetail;
