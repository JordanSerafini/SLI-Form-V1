import { useContext } from "react";
import RatingContext from "../../../context/RatingContext";
import HomeBtn from "../../Button/HomeBtn";

function ArticleDetail() {
  const { itemList } = useContext(RatingContext);
  const { articleId } = useContext(RatingContext);
  
  // Trouvez l'article en fonction de l'ID
  const article = itemList.find(item => item.id.toString() === articleId);
  
  if (!article) {
    return <div>Article non trouvé.</div>;
  }

  return (
    <div className="bg-cream h-full overflow-x-hidden flex flex-col items-center p-4">
      <h2>{article.caption}</h2>
      <div className="bg-white rounded-xl border-brownperso border-4 p-2 shadow-custom mt-4 flex flex-col font-playfair items-center justify-start gap-2">
        <p>Prix HT: <span className="font-bold">{article.salepricevatexcluded}</span></p>
        <p>Prix TTC: <span className="font-bold">{article.salepricevatincluded}</span></p>
        {/* Inclure d'autres détails que vous souhaitez afficher ici */}
      </div>
      <HomeBtn />
    </div>
  );
}

export default ArticleDetail;
