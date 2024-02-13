import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  RatingContext  from "../../context/RatingContext"; 
import logoBack from '../../assets/logoBack.png'; 

const BackBtn = () => {
  const navigate = useNavigate();
  const { lastPath, backPath } = useContext(RatingContext); 
  //console.log(lastPath);
  
  const backHome = () => {
    navigate(backPath);
  };

  return (
    <img src={logoBack} alt="Back Home" className="fixed z-50 bottom-0 right-0 m-4 cursor-pointer" onClick={backHome} />
  );
};

export default BackBtn;
