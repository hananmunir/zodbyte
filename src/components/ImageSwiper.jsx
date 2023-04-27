import React, { useState } from "react";
import LeftChev from "../assets/leftchev.svg";
import RightChev from "../assets/rightchev.svg";
import { SOURCE_SRC } from "../Data/source_src";

const ImageSwiper = () => {
  const [index, setIndex] = useState(0);
  const handlePrevSlide = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };
  const handleNextSlide = () => {
    if (SOURCE_SRC.length - 2 === index) return;
    setIndex(index + 1);
  };
  return (
    <div className="w-full flex items-center md:justify-end sm:justify-center gap-5 relative">
      <img
        src={LeftChev}
        alt="prev"
        onClick={handlePrevSlide}
        className="cursor-pointer"
      />
      <div className="flex md:justify-end justify-center gap-[50px] md:w-auto w-full">
        <img
          className="w-[90%] md:w-[255px] md:h-[160px] h-[180px] object-cover"
          src={SOURCE_SRC[index]}
          alt="swiper"
        />
        <img
          className="w-[255px] h-[160px] object-cover md:block hidden"
          src={SOURCE_SRC[index + 1]}
          alt="swiper"
        />
      </div>
      <img
        src={RightChev}
        alt="next"
        onClick={handleNextSlide}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ImageSwiper;
