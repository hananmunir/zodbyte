import React, { useState } from "react";
import Logo from "../../assets/brandLogo.svg";
import LogoText from "../../assets/ZODBYTE.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useStateContext } from "../../context/context_provider";
import LangDrop from "../LangDrop";
import { animated } from "react-spring";
import { HashLink } from "react-router-hash-link";

const PrimaryAppbar = (props) => {
  const { language, setLang } = useStateContext();
  const [visibility, setVisibility] = useState(false);
  const toggleLanguage = (lang) => {
    setLang(lang);
  };
  const toggleLanguageMob = () => {
    if (language.lang === "English") setLang("et");
    else if (language.lang === "Estonian") setLang("en");

    setVisibility(false);
  };
  const {
    content: { appbar },
  } = language;
  return (
    <animated.header
      {...props}
      className="fixed w-full z-50 bg-white h-[100px]"
    >
      <nav className="flex md:items-center items-start md:flex-row w-full shadow-md py-2 px-[24px] h-[100%]">
        {/* brand */}
          <HashLink
            smooth
            to={"/#"}
            className="flex items-center cursor-pointer"
          >
            <img src={Logo} alt="Logo" />
            <img src={LogoText} alt="LogoText" />
          </HashLink>
        {/* <div className="flex items-center cursor-pointer">
        </div> */}
        {/* menu desktop*/}
        <div className="md:flex flex-2 items-center justify-end w-2/3 border-1 gap-8 hidden">
          <HashLink
            smooth
            to={"/#service"}
            className={"font-[yeezy-tstar-700] text-[32px] leading-[39px]"}
          >
            {appbar.itemOne}
          </HashLink>
          <HashLink
            smooth
            to={"/#contact-us"}
            className={"font-[yeezy-tstar-700] text-[32px] leading-[39px]"}
          >
            {appbar.itemTwo}
          </HashLink>
          <h6
            className={
              "font-[yeezy-tstar-700] text-[20px] leading-[24px] cursor-pointer uppercase"
            }
          >
            {appbar.langTag}
          </h6>
          <LangDrop onToggleLang={toggleLanguage} />
        </div>
      </nav>

      {/* Mobile humburger icon */}
      <div className="md:hidden flex items-center border-[1px] rounded-md border-black p-2 gap-5 w-[56px] h-[56px] absolute top-5 right-5">
        <GiHamburgerMenu
          onClick={() => setVisibility(!visibility)}
          fontSize={50}
        />
      </div>

      {/* menu mobile */}
      <nav
        className={`${
          visibility ? "flex" : "hidden"
        } md:hidden flex-col justify-end w-full absolute top-[5.5rem] bg-white z-10 border-[1px] gap-3 p-[24px]`}
      >
        <HashLink
          smooth
          to={"/#service"}
          className={"font-[yeezy-tstar-700] text-[20px] leading-[24px]"}
          onClick={() => setVisibility(false)}
        >
          Service
        </HashLink>
        <HashLink
          smooth
          to={"/#contact-us"}
          className={"font-[yeezy-tstar-700] text-[20px] leading-[24px]"}
          onClick={() => setVisibility(false)}
        >
          Contact Us
        </HashLink>
        {/* lang converter */}
        <h6
          onClick={toggleLanguageMob}
          className={
            "font-[yeezy-tstar-700] text-[20px] leading-[24px] cursor-pointer"
          }
        >
          {appbar.langTag}
        </h6>
      </nav>
    </animated.header>
  );
};

export default PrimaryAppbar;
