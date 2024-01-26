import React from "react";
import RatingSmiley from "./Rating-Smiley";


function FormLine({ title, children }) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="bg-white rounded-xl border-brownperso border-4 p-4 shadow-custom w-9/10 mt-10 flex flex-col gap-6 font-playfair">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold border-b-4 pb-4 border-brownperso p-2">
          {title}
        </h3>

        {childrenArray.map((child, index) => (
          <section key={index} className="text-base md:text-xl lg:text-2xl lg:gap-6 flex flex-col items-center justify-center gap-2">
            <p className="">
              {child}
            </p>
            <div className="">
              <RatingSmiley />
            </div>
          </section>
        ))}
        <textarea
            className="border border-brownperso flex-1 p-2"
            placeholder="Vos commentaires..."
            rows="3"
          ></textarea>
    </div>
  );
}

export default FormLine;
