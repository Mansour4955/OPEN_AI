import React, { useEffect, useRef, useState } from "react";
import Typewriter from "react-typewriter-effect";
import logo from "../images/artificial-intelligence.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxCopy, RxReload } from "react-icons/rx";
import { PiCopySimpleFill, PiCopySimpleLight } from "react-icons/pi";
const Chat = ({ activeChat, setActiveChat, conversation, setConversation }) => {
  const [fill, setFill] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when component mounts or updates
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, conversation]);
  const fetchNewResponseFromAI = async (lastUserMessageText) => {
    return lastUserMessageText + " " + "ANOTHER ANSWER";
  };
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
    const theLastUserMessage = activeChat.messages.filter(
      (msg) => msg.type === "user"
    );
    const lastUserMessage = theLastUserMessage[theLastUserMessage.length - 1];
    if (lastUserMessage) {
      const lastUserMessageText = lastUserMessage.text;
      // Assuming you have a function to fetch a new response from the AI
      fetchNewResponseFromAI(lastUserMessageText)
        .then((newResponse) => {
          // Add the new AI response to the conversation
          setActiveChat((prevActiveChat) => ({
            ...prevActiveChat,
            messages: [
              ...prevActiveChat.messages,
              { type: "ai", text: newResponse },
            ],
          }));
        })
        .catch((error) => {
          console.error("Error fetching new response:", error);
        });
    }
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
    const theLastUserMessage = conversation.filter((msg) => msg.type === "user");
    const lastUserMessage = theLastUserMessage[theLastUserMessage.length - 1];
    if (lastUserMessage) {
      const lastUserMessageText = lastUserMessage.text;
      // Assuming you have a function to fetch a new response from the AI
      fetchNewResponseFromAI(lastUserMessageText)
        .then((newResponse) => {
          // Add the new AI response to the conversation
          setConversation((prev) => [
            ...prev,
            { type: "ai", text: newResponse },
          ]);
        })
        .catch((error) => {
          console.error("Error fetching new response:", error);
        });
    }
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
              className={"text-white text-left p-2 rounded mb-2"}
            >
              {msg.type === "user" ? (
                <p className="font-bold flex flex-col">
                  <span className="flex gap-1 items-center">
                    <IoPersonCircleOutline className="text-white" size={28} />{" "}
                    You
                  </span>{" "}
                  <span className="pl-2">{msg.text}</span>
                </p>
              ) : (
                <p className="font-bold flex flex-col">
                  <span className="flex gap-1 items-center">
                    <img alt="logo" src={logo} className="w-9 h-9" />
                    Azul AI
                  </span>{" "}
                  <span className="pl-2">
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
                        className="cursor-pointer"
                      >
                        {!fill ? <PiCopySimpleLight /> : <PiCopySimpleFill />}
                      </span>
                      <span
                        onClick={handleReloadActiveChat}
                        className="cursor-pointer"
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
              "text-white text-left bg-transparent p-2 rounded mb-2 max-w-[100%]"
            }
          >
            {msg.type === "user" ? (
              <p className="font-bold flex flex-col">
                <span className="flex gap-1 items-center text-white">
                  <IoPersonCircleOutline className="text-white" size={28} /> You
                </span>{" "}
                <span className="pl-2 flex flex-wrap">{msg.text}</span>
              </p>
            ) : (
              <p className="font-bold flex flex-col">
                <span className="flex gap-1 items-center text-white">
                  <img alt="logo" src={logo} className="w-9 h-9" />
                  Azul AI
                </span>{" "}
                <span className="pl-2 flex flex-wrap">
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
                      className="cursor-pointer"
                    >
                      {!fill ? <PiCopySimpleLight /> : <PiCopySimpleFill />}
                    </span>
                    <span
                      onClick={handleReloadConversation}
                      className="cursor-pointer"
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
