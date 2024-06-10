import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import uir from "../images/uir.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setLangUser } from "../redux/optionsSlice";
import { setMode } from "../redux/modeSlice";
import {
  MdDarkMode,
  MdOutlineDarkMode,
  MdOutlineLanguage,
} from "react-icons/md";
import { useLocalStorage } from "../hooks/useLocalStorage";
function Header() {
  const { setItem, getItem } = useLocalStorage("theme");
  const { setItem: setItemLangUser } = useLocalStorage("lang");

  // const theTheme = getItem();
  const { mode } = useSelector((state) => state.themode);
  const [language, setLanguage] = useState("english");
  const [theLang, setTheLang] = useState(false);
  const [theLight, setTheLight] = useState(mode);
  const [showLangs, setShowLangs] = useState(false);
  const [formType, setFormType] = useState("Professional");
  const dispatch = useDispatch();
  useEffect(() => {
    setTheLight(mode);
  }, [mode]);
  // useEffect(() => {
  //   dispatch(setMode(theTheme));
  //   console.log("theTheme ", theTheme);
  // }, [theTheme]);
  const handleLanguageChange = (selectedLanguage) => {
    setItemLangUser(selectedLanguage);
    setLanguage(selectedLanguage);
    dispatch(setLangUser(selectedLanguage));
    setShowLangs(false);
  };
  // const handleFormTypeChange = (selectedType) => {
  //   setFormType(selectedType);
  // };
  return (
    <div
      className={`bg-[#808080] py-2 px-10 flex items-center justify-between gap-5 z-50 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]`}
    >
      <div className="flex gap-3 px-2 items-center justify-center">
        <Link
          to="/"
          className="text-3xl font-bold text-blue-500 flex items-center gap-1"
        >
          <img alt="uir" src={uir} className="h-10 w-10 rounded-full" />
          <span className={`${theLight === "light" ? "text-white" : "text-black"}`}>AZUL</span>
        </Link>
        {/* <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-5 text-lg"
              : "font-semibold  text-lg"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-5 text-lg "
              : "font-semibold  text-lg"
          }
          to="/chats"
        >
          My Chats
        </NavLink> */}
      </div>
      <div className="flex relative gap-3 px-2 items-center justify-center">
        {/* Language Selector Component */}

        <span
          onClick={() => setShowLangs(!showLangs)}
          className={`${
            theLight === "light" ? "text-black bg-white" : "text-white bg-black"
          } flex p-1 rounded-full outline-none cursor-pointer duration-150 ${
            !theLight === "light"
              ? "hover:bg-gray-50/60"
              : "hover:bg-gray-50/60"
          }`}
        >
          <MdOutlineLanguage size={28} />
        </span>

        {showLangs && (
          <select
            className={`${
              theLight === "light" ? "bg-black text-white" : "bg-white text-black"
            } p-2 absolute top-[140%] rounded border font-semibold cursor-pointer outline-none`}
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="arabic">Arabic</option>
          </select>
        )}

        <div className="flex outline-none ">
          {theLight === "light" ? (
            <span
              className={`bg-white rounded-full p-1 cursor-pointer text-black duration-150 ${
                !theLight === "light"
                  ? "hover:bg-gray-50/60"
                  : "hover:bg-gray-50/60"
              }`}
              onClick={() => {
                setItem("dark");
                setTheLight("dark");
                dispatch(setMode("dark"));
              }}
            >
              <MdDarkMode size={28} />
            </span>
          ) : (
            <span
              className={`bg-black rounded-full p-1 cursor-pointer text-white duration-150 ${
                !theLight === "light"
                  ? "hover:bg-gray-50/60"
                  : "hover:bg-gray-50/60"
              }`}
              onClick={() => {
                setItem("light");
                setTheLight("light");
                dispatch(setMode("light"));
              }}
            >
              <MdOutlineDarkMode size={28} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
