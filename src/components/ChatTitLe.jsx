import React from "react";

const ChatTitLe = ({ title, onTitleClick }) => {
  return (
    <div
      onClick={() => onTitleClick(title)}
      className="bg-[#808080] line-clamp-2 hover:bg-gray-500 text-base font-semibold text-white cursor-pointer px-2 py-1 flex items-center rounded-lg w-full"
    >
      {title}
    </div>
  );
};

export default ChatTitLe;
