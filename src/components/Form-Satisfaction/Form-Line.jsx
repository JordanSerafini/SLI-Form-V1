import React, { useContext } from "react";
import RatingSmiley from "./Rating-Smiley";

import RatingContext from "../../context/RatingContext";

import PropTypes from "prop-types";

function FormLine({ title, children, formID }) {
// Add prop validation for 'title'
FormLine.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  formID: PropTypes.string.isRequired,
};
  const childrenArray = React.Children.toArray(children);
  const { handleCommentSubmit } = useContext(RatingContext);
  
  const handleComment = (comment) => {
    const commentData = {
    comment: comment,
    formID: formID,
    };
    handleCommentSubmit(commentData);

  };

  return (
    <div 
    className="bg-white rounded-xl border-brownperso border-4 p-4 shadow-custom w-9/10 mt-10 flex flex-col gap-8 font-playfair ">
      <h3 className="text-lg md:text-xl lg:text-2xl font-bold border-b-4 pb-4 border-brownperso p-2">
        {title}
      </h3>

      {childrenArray.map((child, index) => (
        //console.log(index),
        <section key={index} className="text-base md:text-base lg:text-2xl lg:gap-6 flex flex-col items-center justify-center gap-6 font-semibold text-blue-light">
          <p>{child}</p>
          <div>
            <RatingSmiley 
              value={index}
              formID={formID}
            />
          </div>
        </section>
      ))}
      <textarea
        className="border border-blue-strong flex-1 p-2"
        placeholder="Vos commentaires..."
        rows="3"
        onChange={(e) => handleComment(e.target.value)}
      ></textarea>
    </div>
  );
}

export default FormLine;
