import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function LazyLoadingGameImage({ image }) {
  return (
    <div className="lazy-image">
      <LazyLoadImage
        alt="game image"
        src={image}
        className="h-full"
        effect="blur"
        wrapperProps={{
          style: {
            transitionDelay: "0.5s",
          },
        }}
      ></LazyLoadImage>
    </div>
  );
}

export default LazyLoadingGameImage;
