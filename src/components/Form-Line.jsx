import React from "react";
import RatingSmiley from "./Rating-Smiley";
import { Rating, initTE } from "tw-elements";

initTE({ Rating });

function FormLine({ title, children }) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="bg-cream border-brown border-4 p-4 shadow-custom w-9/10 mt-10 font-lato flex flex-col  gap-8">
        <h3 className="text-xl font-bold border-b-4 pb-4 border-brown p-2">
          {title}
        </h3>

        {childrenArray.map((child, index) => (
          <section key={index} className="text-base flex flex-col items-center justify-center">
            <p className="">
              {child}
            </p>
            <div className="">
              <RatingSmiley />
            </div>
          </section>
        ))}
    </div>
  );
}

export default FormLine;
