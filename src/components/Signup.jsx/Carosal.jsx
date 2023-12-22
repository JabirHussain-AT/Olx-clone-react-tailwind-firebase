import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";

import Image1 from "../../assets/Product1.webp";
import Image2 from "../../assets/Product1.webp";
import Image3 from "../../assets/AdBanner.png";

const Carosal = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...carouselSettings}>
      <div>
        <img src={Image1} alt="Image1" className="w-full h-32 object-cover" />
        <p className="text-center text-sm mt-5">
          Help us become one the safest places to buy and sell
        </p>
      </div>
      <div>
        <img src={Image2} alt="Image2" className="w-full h-32 object-cover" />
        <p className="text-center text-sm mt-5">
          Close deals from the comfort of your home.
        </p>
      </div>
      <div>
        <img src={Image3} alt="Image3" className="w-full h-32 object-cover" />
        <p className="text-center text-sm mt-5">
          Keep all your favorits in one place.
        </p>
      </div>
    </Slider>
  );
};

export default Carosal;
