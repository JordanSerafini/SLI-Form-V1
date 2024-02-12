import { useNavigate } from 'react-router-dom';
//import { useContext } from 'react';
import logoBack from '../../assets/logoBack.png'; 

//import RatingContext from "../../context/RatingContext"; 

const HomeBtn = () => {
    const navigate = useNavigate();
   // const { showToast } = useContext(RatingContext);

    const backHome = () => {

        //showToast('Page home' , { position: "bottom-right", autoClose: 1500});
        
        navigate('/home');
    };

    return (
        <img src={logoBack} alt="Back Home" className="fixed z-50 bottom-0 right-0 m-4 cursor-pointer" onClick={backHome} />

    );
};

export default HomeBtn;
