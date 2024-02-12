import  { createContext, useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RatingContext = createContext();

// eslint-disable-next-line react/prop-types
export const RatingProvider = ({ children }) => {
  const [rateArray, setRateArray] = useState([]);
  const [commentArray, setCommentArray] = useState([]);
  const [user , setUser] = useState({});
  const [clientList, setClientList] = useState([]);
  const [itemList, setItemList] = useState([]);


  const handleRatingSubmit = (ratingData) => {
    // Vérifiez si l'objet avec le même questionID et formID existe déjà
    const existingIndex = rateArray.findIndex(item => 
      item.questionID === ratingData.questionID && item.formID === ratingData.formID
    );
  
    let newArray = [];
  
    if (existingIndex !== -1) {
      // Remplacez l'objet existant par le nouveau
      newArray = rateArray.map((item, index) => 
        index === existingIndex ? ratingData : item
      );
    } else {
      // Ajoutez le nouvel objet à la fin du tableau
      newArray = [...rateArray, ratingData];
    }
  
    // Mettez à jour l'état avec le nouveau tableau
    setRateArray(newArray);
  };
  
  const handleCommentSubmit = (commentData) => {
    // Trouver l'index existant du commentaire avec le même formID
    const existingIndex = commentArray.findIndex(item => item.formID === commentData.formID);
  
    let newCommentArray = [...commentArray]; // Faire une copie de l'array actuel pour les manipulations
  
    if (commentData.comment.trim() === "") {
      // Si le commentaire est vide, supprimez l'élément du tableau
      if (existingIndex !== -1) {
        newCommentArray.splice(existingIndex, 1);
      } // Si le commentaire n'existe pas encore, ne faites rien
    } else {
      if (existingIndex !== -1) {
        // Remplacez le commentaire existant par le nouveau
        newCommentArray[existingIndex] = commentData;
      } else {
        // Ajoutez le nouveau commentaire à la fin du tableau
        newCommentArray.push(commentData);
      }
    }
  
    // Mettez à jour l'état avec le nouveau tableau de commentaires
    setCommentArray(newCommentArray);
    //console.log(newCommentArray);
  };

  const handleUserSubmit = (userData) => {
    setUser(userData);
    //console.log(user)
  };
  
  
  
  const averageRating = useMemo(() => {
    if (rateArray.length === 0) return { average: 0, comment: "Aucune note" };

    const totalRating = rateArray.reduce((acc, current) => acc + current.rating, 0);
    const average = totalRating / rateArray.length; 
    let comment = "";

    if (average > 0 && average < 1.5) comment = "Très insatisfait";
    else if (average >= 1.5 && average < 2.5) comment = "Insatisfait";
    else if (average >= 2.5 && average < 3) comment = "Moyen";
    else if (average >= 3 && average < 4.2) comment = "Satisfait";
    else if (average >= 4.2 && average <= 5) comment = "Très satisfait";

    return { average: Math.ceil(average), comment };
  }, [rateArray]);

  
  const showToast = (msg, options = {}) => {
    toast(msg, options); 
  };

  return (
    <RatingContext.Provider value={{ user, setUser, rateArray, setRateArray, handleRatingSubmit, averageRating, commentArray, setCommentArray, handleCommentSubmit, handleUserSubmit, showToast, clientList, setClientList, itemList,setItemList }}>
      {children}
      <ToastContainer />
    </RatingContext.Provider>
  );
};

export default RatingContext;
