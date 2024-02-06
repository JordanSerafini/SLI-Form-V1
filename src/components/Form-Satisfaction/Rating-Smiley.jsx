import { useEffect, useContext } from "react";
import { Rating, initTE } from "tw-elements";
import RatingContext from "../../context/RatingContext";

const RatingSmiley = ({value, formID}) => {
 
  const { rateArray, setRateArray, handleRatingSubmit, averageRating } = useContext(RatingContext);

  const questionID = value;

  useEffect(() => {
    initTE({ Rating });
  }, []);

  const handleClick = (note) => {
    const ratingData = {
      rating: note,
      formID: formID,
      questionID: questionID,
    };
    handleRatingSubmit(ratingData);
    
  };


  
  return (
    <div className="text-center">
      <ul
        className="flex list-none gap-6 md:gap-10 test:gap-8 lg:gap-14 p-0 justify-center items-center"
        data-te-rating-init
        data-te-dynamic="true"
        data-te-active="bg-current rounded-full !fill-black"
      >
        <li 
        className="flex justify-center items-center"
        >
      
          <span
            
            className="w-full text-[#FF0000] fill-current [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-10 sm:[&>svg]:w-10 lg:[&>svg]:h-14 lg:[&>svg]:w-14"
            data-te-rating-icon-ref
            onClick={() => handleClick(1)} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm72.4-118.5c9.7-9 10.2-24.2 1.2-33.9C315.3 344.3 290.6 328 256 328s-59.3 16.3-73.5 31.6c-9 9.7-8.5 24.9 1.2 33.9s24.9 8.5 33.9-1.2c7.4-7.9 20-16.4 38.5-16.4s31.1 8.5 38.5 16.4c9 9.7 24.2 10.2 33.9 1.2zM176.4 272c17.7 0 32-14.3 32-32c0-1.5-.1-3-.3-4.4l10.9 3.6c8.4 2.8 17.4-1.7 20.2-10.1s-1.7-17.4-10.1-20.2l-96-32c-8.4-2.8-17.4 1.7-20.2 10.1s1.7 17.4 10.1 20.2l30.7 10.2c-5.8 5.8-9.3 13.8-9.3 22.6c0 17.7 14.3 32 32 32zm192-32c0-8.9-3.6-17-9.5-22.8l30.2-10.1c8.4-2.8 12.9-11.9 10.1-20.2s-11.9-12.9-20.2-10.1l-96 32c-8.4 2.8-12.9 11.9-10.1 20.2s11.9 12.9 20.2 10.1l11.7-3.9c-.2 1.5-.3 3.1-.3 4.7c0 17.7 14.3 32 32 32s32-14.3 32-32z"
                className="w-full h-auto"
              />
            </svg>
          </span>
        </li>
        <li>
          <span
            className="text-[#ff8000] fill-current [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-10 sm:[&>svg]:w-10 lg:[&>svg]:h-14 lg:[&>svg]:w-14"
            data-te-rating-icon-ref
            onClick={() => handleClick(2)} 

          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </span>
        </li>
        <li>
          <span
            className="text-[#e0e04bdc] fill-current [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-10 sm:[&>svg]:w-10 lg:[&>svg]:h-14 lg:[&>svg]:w-14"
            data-te-rating-icon-ref
            onClick={() => handleClick(3)} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z" />
            </svg>
          </span>
        </li>
        <li>
          <span
            className="text-[#90EE90] fill-current [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-10 sm:[&>svg]:w-10 lg:[&>svg]:h-14 lg:[&>svg]:w-14"
            data-te-rating-icon-ref
            onClick={() => handleClick(4)} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </span>
        </li>
        <li>
          <span
            className="text-[#0ebd0ebe] fill-current [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-10 sm:[&>svg]:w-10 lg:[&>svg]:h-14 lg:[&>svg]:w-14"
            data-te-rating-icon-ref
            onClick={() => handleClick(5)} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM183.2 132.6c-1.3-2.8-4.1-4.6-7.2-4.6s-5.9 1.8-7.2 4.6l-16.6 34.7-38.1 5c-3.1 .4-5.6 2.5-6.6 5.5s-.1 6.2 2.1 8.3l27.9 26.5-7 37.8c-.6 3 .7 6.1 3.2 7.9s5.8 2 8.5 .6L176 240.5l33.8 18.3c2.7 1.5 6 1.3 8.5-.6s3.7-4.9 3.2-7.9l-7-37.8L242.4 186c2.2-2.1 3.1-5.3 2.1-8.3s-3.5-5.1-6.6-5.5l-38.1-5-16.6-34.7zm160 0c-1.3-2.8-4.1-4.6-7.2-4.6s-5.9 1.8-7.2 4.6l-16.6 34.7-38.1 5c-3.1 .4-5.6 2.5-6.6 5.5s-.1 6.2 2.1 8.3l27.9 26.5-7 37.8c-.6 3 .7 6.1 3.2 7.9s5.8 2 8.5 .6L336 240.5l33.8 18.3c2.7 1.5 6 1.3 8.5-.6s3.7-4.9 3.2-7.9l-7-37.8L402.4 186c2.2-2.1 3.1-5.3 2.1-8.3s-3.5-5.1-6.6-5.5l-38.1-5-16.6-34.7zm6.3 175.8c-28.9 6.8-60.5 10.5-93.6 10.5s-64.7-3.7-93.6-10.5c-18.7-4.4-35.9 12-25.5 28.1c24.6 38.1 68.7 63.5 119.1 63.5s94.5-25.4 119.1-63.5c10.4-16.1-6.8-32.5-25.5-28.1z" />
            </svg>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RatingSmiley;
