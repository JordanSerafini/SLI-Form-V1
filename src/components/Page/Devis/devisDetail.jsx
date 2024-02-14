import { useContext } from 'react';
import RatingContext from '../../../context/RatingContext';
import HomeBtn from "../../Button/HomeBtn"

function DevisDetail() {
    const { devis, removeItemFromDevis } = useContext(RatingContext);

    const handleRemoveItem = (index) => {
      removeItemFromDevis(index);
    };

    return (
        <div>
            <h1>Nom du client:</h1>
            {devis.items && devis.items.length > 0 ? (
                <ul>
                    {devis.items.map((item, index) => (
                        <li key={index}>
                          {item.caption} 
                          <button onClick={() => handleRemoveItem(index)} style={{marginLeft: '10px'}}>X</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun article dans le devis.</p>
            )}
            <HomeBtn />
        </div>
    );
}

export default DevisDetail;
