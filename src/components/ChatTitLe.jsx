import React from "react";

const ChatTitLe = ({ title, onTitleClick }) => {
  return (
    <div
      onClick={() => onTitleClick(title)}
      className="text-xl font-semibold hover:bg-blue-600 text-white cursor-pointer px-2 py-1 flex items-center rounded-lg bg-blue-500 w-full"
    >
      {title}
    </div>
  );
};

export default ChatTitLe;
