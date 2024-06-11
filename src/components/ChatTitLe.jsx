import React from "react";

const ChatTitLe = ({ title, onTitleClick, theme }) => {
  return (
    <div
      onClick={() => onTitleClick(title)}
      className={` ${
        theme === "light" ? "text-white bg-gray-500 hover:bg-gray-600" : "text-black bg-gray-500 hover:bg-gray-600"
      }  line-clamp-2 duration-200  text-base font-semibold cursor-pointer px-2 py-1 flex items-center rounded-lg w-full`}
    >
      {title}
    </div>
  );
};

export default ChatTitLe;
