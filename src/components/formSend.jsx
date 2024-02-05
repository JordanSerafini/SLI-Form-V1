import { useContext } from 'react'

import RatingContext from '../context/RatingContext'

function formSend() {
  const { user, commentArray, rateArray } = useContext(RatingContext);
  
  console.log(user);
  console.log(commentArray);
  console.log(rateArray);
  
  return (
    <div>
      
    </div>
  )
}

export default formSend