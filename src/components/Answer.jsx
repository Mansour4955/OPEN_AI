import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
const Answer = ({ q }) => {
  const [typedtext, setTypedText] = useState("");
  useEffect(() => {
    let currentIndex = 0;
    const textLength = q.length;
    const intervalId = setInterval(() => {
      if (currentIndex <= textLength) {
        setTypedText(q.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 20);
    return () => clearInterval(intervalId);
  }, [q]);
  return (
    <div className="">
      <ReactMarkdown>{typedtext}</ReactMarkdown>
    </div>
  );
};

export default Answer;
