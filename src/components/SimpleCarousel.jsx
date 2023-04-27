import React, { useState } from "react";
import Carousel from "react-simply-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SOURCE_SRC } from "../Data/source_src";

const SimpleCarousel = ({ centerMode }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <div className=" max-md:w-[85%] max-md:ml-4">
      <Carousel
        containerProps={{
          style: {
            position: "relative",
            width: "100%",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "flex-end",
            userSelect: "text",
            maxWidth: "100%",
          },
        }}
        centerMode={centerMode}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: <FaChevronRight size={30} />,
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            position: "absolute",
            right: -90,
          },
        }}
        backwardBtnProps={{
          children: <FaChevronLeft size={30} />,
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
          },
        }}
        dotsNav={{
          show: false,
          itemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              border: 0,
            },
          },
          activeItemBtnProps: {
            style: {
              height: 16,
              width: 16,
              borderRadius: "50%",
              border: 0,
              background: "black",
            },
          },
        }}
        itemsToShow={2}
        speed={400}
        responsiveProps={[
          { minWidth: 768, itemsToShow: 2 },
          { maxWidth: 767, itemsToShow: 1 },
        ]}
      >
        {SOURCE_SRC.map((item, index) => (
          <div
            className="w-[350px] h-[250px] max-md:h-[350px] max-md:w-[500px]"
            key={index}
          >
            <img
              src={item}
              alt="slider.image"
              className="h-[220px] max-md:h-[300px] w-[350px] max-md:w-[500px] object-cover border-8 border-transparent carousel_img"
            />
            <h6 className="font-roboto text-white text-center relative ">Zodbyte</h6>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SimpleCarousel;
