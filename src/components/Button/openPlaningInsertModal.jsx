import { useContext } from "react";
import RatingContext from "../../context/RatingContext";

function OpenPlaningInsertModal() {
    
    const { setIsModalOpen } = useContext(RatingContext);

    const handleAddEvent = () => {
        setIsModalOpen(true);
      };
      
  return (
    <button className="btn btn-primary" onClick={handleAddEvent}>Ajouter un événement</button>
    )
}

export default OpenPlaningInsertModal