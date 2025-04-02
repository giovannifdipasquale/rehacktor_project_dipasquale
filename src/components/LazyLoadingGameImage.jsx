import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function LazyLoadingGameImage({ image }) {
  return (
    <LazyLoadImage
      alt="game image"
      src={image}
      effect="blur"
      wrapperProps={{
        style: {
          transitionDelay: "0.5s",
        },
      }}
    ></LazyLoadImage>
  );
}

export default LazyLoadingGameImage;
