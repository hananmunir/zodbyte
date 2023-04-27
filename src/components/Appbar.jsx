import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/brandLogo.svg";
import LogoText from "../assets/ZODBYTE.svg";
import Hamburger from "../assets/hamburger.svg";
import { useStateContext } from "../context/context_provider";

const Appbar = () => {
  const { language, setLang } = useStateContext();
  const [visibility, setVisibility] = useState(false);
  const toggleLanguage = () => {
    if (language?.lang === "English") {
      setLang("et");
    } else if (language?.lang === "Estonian") {
      setLang("en");
    }
  };
  const {
    content: { appbar },
  } = language;
  return (
    <header className="relative bg-white">
      <nav className="flex md:items-center items-start md:flex-row w-full border-[1px] border-black py-2 px-[24px]">
        {/* brand */}
        <div className="flex items-center cursor-pointer">
          <img src={Logo} alt="Logo" />
          <img src={LogoText} alt="LogoText" />
        </div>
        {/* menu desktop*/}
        <div className="md:flex flex-2 items-center justify-end w-2/3 border-1 gap-8 hidden">
          <NavLink
            to={"/service"}
            className={"font-[yeezy-tstar-700] text-[32px] leading-[39px]"}
          >
            {appbar.itemOne}
          </NavLink>
          <NavLink
            to={"/contact-us"}
            className={"font-[yeezy-tstar-700] text-[32px] leading-[39px]"}
          >
            {appbar.itemTwo}
          </NavLink>
          <h6
            className={
              "font-[yeezy-tstar-700] text-[20px] leading-[24px] cursor-pointer uppercase"
            }
            onClick={toggleLanguage}
          >
            {appbar.langTag}
          </h6>
        </div>
      </nav>
      <div className="md:hidden flex items-center  gap-5 w-[56px] h-[56px] absolute top-5 right-14">
        {/* lang converter */}
        <h6
          onClick={toggleLanguage}
          className={
            "font-[yeezy-tstar-700] text-[20px] leading-[24px] cursor-pointer"
          }
        >
          EN
        </h6>
        <img
          onClick={() => setVisibility(!visibility)}
          className="cursor-pointer"
          src={Hamburger}
          alt="close menu"
        />
      </div>

      {/* menu mobile */}
      <nav
        className={`${
          visibility ? "flex" : "hidden"
        } md:hidden flex-col justify-end w-full absolute top-[5.5rem] bg-white z-10 border-[1px] gap-3 p-[24px]`}
      >
        <NavLink
          to={"/service"}
          className={"font-[yeezy-tstar-700] text-[20px] leading-[24px]"}
        >
          Service
        </NavLink>
        <NavLink
          to={"/contact-us"}
          className={"font-[yeezy-tstar-700] text-[20px] leading-[24px]"}
        >
          Contact Us
        </NavLink>
      </nav>
    </header>
  );
};

export default Appbar;