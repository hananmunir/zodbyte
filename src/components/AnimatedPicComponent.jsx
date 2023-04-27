import React from "react";
import "../styles/component.css";
import { BiChevronRight } from "react-icons/bi";

const AnimatedPicComponent = ({ src, title, des, url, btnText }) => {
  return (
    <div className="AnimatedPicContainer cursor-pointer relative md:min-h-[400px] max-md:h-[250px] md:mt-0 mt-5 flex flex-1 justify-center flex-col max-md:m-5">
      <div className="c-card-offset__image-placeholder"></div>
      <div className="AnimatedPicComponent bg-[#fff] w-[80%] h-auto z-30 self-center shadow-md p-[5%] max-md:py-10 relative max-md:absolute max-md:bottom-[10%] bottom-8">
        <h2 className="font-[yeezy-tstar-700] lg:text-[40px] text-[34px] leading-[42px] mb-2">
          {title}
        </h2>
        <p className="font-[yeezy-tstar-700] text-[1vw] max-md:text-[18px] max-md:leading-5 leading-[1.2vw] mt-5">
          {des}
        </p>
        <button className="flex items-center relative font-[yeezy-tstar-700] h-6 text-[18px] leading-5 max-md:leading-[18px] mt-5 hover:border-b-2 hover:delay-75 border-black">
          {btnText}
          <BiChevronRight fontSize={30} className="absolute -right-6" />
        </button>
      </div>
      <picture className="c-card-offset__image">
        <source srcSet={src} />
        <img
          className="c-image c-image--cover lazyloaded"
          loading="lazy"
          src={src}
          alt="The Future"
          data-ll-status="loaded"
        />
      </picture>
    </div>
  );
};

export default AnimatedPicComponent;
