import React, { useEffect, useRef, useState } from "react";
import Typewriter from "react-typewriter-effect";
import logo from "../images/artificial-intelligence.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxCopy, RxReload } from "react-icons/rx";
import { PiCopySimpleFill, PiCopySimpleLight } from "react-icons/pi";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = ({ activeChat, setActiveChat, conversation, setConversation }) => {
  
  
  const [fill, setFill] = useState(false);
  const [reload, setReload] = useState(false);
  const { lang } = useSelector((state) => state.options);
  const { mode } = useSelector((state) => state.themode);
  const [theLight, setTheLight] = useState(mode);
  const bottomRef = useRef(null);
  useEffect(() => {
    setTheLight(mode);
  }, [mode]);
  useEffect(() => {
    // Scroll to bottom when component mounts or updates
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, conversation]);
  // const fetchNewResponseFromAI = async (lastUserMessageText) => {
  //   return lastUserMessageText + " " + "ANOTHER ANSWER";
  // };
  const handleCopyActiveChat = (text) => {
    // Function to copy the text
    navigator.clipboard.writeText(text);
    // Optionally, you can show a notification or perform any other action
    setFill(true);
    setTimeout(() => {
      setFill(false);
    }, 2000);
  };

  const handleReloadActiveChat = () => {
    setReload(true);
    let userQuestion;
    const theLastUserMessage = activeChat.messages.filter(
      (msg) => msg.type === "user"
    );
    const lastUserMessage = theLastUserMessage[theLastUserMessage.length - 1];
    if (lastUserMessage) {
      userQuestion = lastUserMessage.text;
    }
    const postData = {
      question: userQuestion,
      language: lang,
      conversationId: "bcdde811-fcd3-48c5-a9ff-95e71ac9516f",
    };

    axios
      .post("http://localhost:5264/API/Question", postData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setReload(false);
        setActiveChat((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              type: "ai",
              text: res.data.result.answer.answerContent,
            },
          ],
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopyConversation = (text) => {
    // Function to copy the text
    navigator.clipboard.writeText(text);
    // Optionally, you can show a notification or perform any other action
    setFill(true);
    setTimeout(() => {
      setFill(false);
    }, 2000);
  };

  const handleReloadConversation = () => {
    setReload(true);
    let userQuestion;
    const theLastUserMessage = conversation.filter(
      (msg) => msg.type === "user"
    );
    const lastUserMessage = theLastUserMessage[theLastUserMessage.length - 1];
    if (lastUserMessage) {
      userQuestion = lastUserMessage.text;
    }

    const postData = {
      question: userQuestion,
      language: lang,
      conversationId: "bcdde811-fcd3-48c5-a9ff-95e71ac9516f",
    };
    axios
      .post("http://localhost:5264/API/Question", postData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.result);
        // question.questionContent
        //answer.answerContent
        setReload(false);
        setConversation((conversation) => [
          ...conversation,
          { type: "ai", text: res.data.result.answer.answerContent },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mb-4 w-full max-w-full">
      {/* Conversation Component */}
      {/* Display conversation */}
      {activeChat && (
        <div className="conversation">
          {activeChat.messages.map((msg, index) => (
            <div
              key={index}
              className={"text-[#808080] text-left p-2 rounded mb-2"}
            >
              {msg.type === "user" ? (
                <p className="font-bold flex flex-col text-lg">
                  <span className="flex gap-1 items-center">
                    <IoPersonCircleOutline className="" size={28} /> You
                  </span>{" "}
                  <span
                    className={`${
                      theLight === "light" ? "text-black" : "text-white"
                    } pl-2 font-medium text-base`}
                  >
                    {msg.text}
                  </span>
                </p>
              ) : (
                <p className="font-bold flex flex-col text-lg">
                  <span className="flex gap-1 items-center">
                    <img alt="logo" src={logo} className="w-9 h-9" />
                    Azul AI
                  </span>{" "}
                  <span
                    className={`${
                      theLight === "light" ? "text-black" : "text-white"
                    } pl-2 font-medium text-base`}
                  >
                    {activeChat.messages.length - 1 === index ? (
                      <Typewriter
                        text={msg.text}
                        typeSpeed={20}
                        hideCursorAfterText={true}
                        cursorColor="white"
                      />
                    ) : (
                      msg.text
                    )}
                  </span>
                  {activeChat.messages.length - 1 === index && (
                    <span className="pl-2 flex items-center gap-1 mt-1">
                      <span
                        onClick={() => handleCopyActiveChat(msg.text)}
                        className={`${
                          theLight === "light" ? "text-black" : "text-white"
                        } cursor-pointer`}
                      >
                        {!fill ? <PiCopySimpleLight /> : <PiCopySimpleFill />}
                      </span>
                      <span
                        onClick={handleReloadActiveChat}
                        className={`${
                          reload ? "animate-spin" : ""
                        } cursor-pointer ${
                          theLight === "light" ? "text-black" : "text-white"
                        }`}
                      >
                        <RxReload />
                      </span>
                    </span>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {!activeChat &&
        conversation.map((msg, index) => (
          <div
            key={index}
            className={
              "text-[#808080] text-left bg-transparent p-2 rounded mb-2 max-w-[100%]"
            }
          >
            {msg.type === "user" ? (
              <p className="font-bold flex flex-col text-lg">
                <span className="flex gap-1 items-center text-[#808080]">
                  <IoPersonCircleOutline className="text-[#808080]" size={28} />{" "}
                  You
                </span>{" "}
                <span
                  className={`${
                    theLight === "light" ? "text-black" : "text-white"
                  } pl-2 flex flex-wrap font-medium text-base`}
                >
                  {msg.text}
                </span>
              </p>
            ) : (
              <p className="font-bold flex flex-col text-lg">
                <span className="flex gap-1 items-center text-[#808080]">
                  <img alt="logo" src={logo} className="w-9 h-9" />
                  Azul AI
                </span>{" "}
                <span
                  className={`${
                    theLight === "light" ? "text-black" : "text-white"
                  } pl-2 flex flex-wrap font-medium text-base`}
                >
                  <Typewriter
                    text={msg.text}
                    typeSpeed={20}
                    hideCursorAfterText={true}
                    cursorColor="white"
                  />
                </span>
                {conversation.length - 1 === index && (
                  <span className="pl-2 flex items-center gap-1 mt-1">
                    <span
                      onClick={() => handleCopyConversation(msg.text)}
                      className={`${
                        theLight === "light" ? "text-black" : "text-white"
                      } cursor-pointer`}
                    >
                      {!fill ? <PiCopySimpleLight /> : <PiCopySimpleFill />}
                    </span>
                    <span
                      onClick={handleReloadConversation}
                      className={`${
                        reload ? "animate-spin" : ""
                      } cursor-pointer ${
                        theLight === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      <RxReload />
                    </span>
                  </span>
                )}
              </p>
            )}
          </div>
        ))}
      <div ref={bottomRef} /> {/* Empty div to scroll to */}
    </div>
  );
};

export default Chat;
