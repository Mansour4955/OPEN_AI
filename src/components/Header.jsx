import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import uir from "../images/artificial-intelligence.png"
function Header() {
  const [language, setLanguage] = useState("En");
  const [formType, setFormType] = useState("Professional");

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
  const handleFormTypeChange = (selectedType) => {
    setFormType(selectedType);
  };
  return (
    <div className="py-2 px-10 flex items-center justify-between gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="flex gap-3 px-2 items-center justify-center">
        <Link to="/" className="text-3xl font-bold text-blue-500 flex items-center gap-1">
          <img alt="uir" src={uir} className="h-10 w-10"/>
          <span>AZUL</span>
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
      <div className="flex gap-3 px-2 items-center justify-center">
        {/* Language Selector Component */}
        <select
          className="p-2 rounded border bg-blue-400 font-semibold cursor-pointer outline-none text-white"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="En">English</option>
          <option value="Fr">French</option>
          <option value="Ar">Arabic</option>
        </select>
        <select
          className="p-2 rounded border bg-blue-400 font-semibold cursor-pointer outline-none text-white"
          value={formType}
          onChange={(e) => handleFormTypeChange(e.target.value)}
        >
          <option value="standard">Standard</option>
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
