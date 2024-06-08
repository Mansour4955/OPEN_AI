import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import Footer from "../components/Footer";
import { FaCode } from "react-icons/fa";
import { TbArrowsMoveVertical } from "react-icons/tb";
// import Typewriter from "react-typewriter-effect";
import logo from "../images/artificial-intelligence.png";
import { BsFillChatFill } from "react-icons/bs";
import { chats, questions } from "../data";
import Slider from "react-slick";
import ChatTitLe from "../components/ChatTitLe";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import backgroundImage from "../images/photomania-d6d420bf7b58b00b31ac130e0ed34f9e.jpg";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Chat from "../components/Chat";
const Home = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [openSide, setOpenSide] = useState(true);

  const [answers, setAnswers] = useState({});
  const [conversation, setConversation] = useState([]);
  const [clickedQuestions, setClickedQuestions] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // Define the activeChat state
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 5000);
  };
  const openAI = {
    ask: async (question) => {
      // Placeholder for sending question to OpenAI and receiving response
      return "Placeholder response for question: " + question;
    },
  };

  const handleQuestionClick = async (question) => {
    try {
      if (!clickedQuestions.includes(question)) {
        const response = await openAI.ask(question); // Placeholder for asking question to OpenAI
        setConversation((prevConversation) => [
          ...prevConversation,
          { type: "user", text: question },
          { type: "ai", text: response },
        ]);
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [question]: response,
        }));
        setClickedQuestions(questions); // Mark all questions as clicked
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  const handleUserQuestionChange = (e) => {
    setUserQuestion(e.target.value);
    setIsHovered(false);
  };

  const handleSubmit = async () => {
    // Check if there's an active chat
    if (activeChat) {
      // Add user's question to the active chat's messages
      activeChat.messages.push({ type: "user", text: userQuestion });

      try {
        // Fetch response from OpenAI
        const response = await openAI.ask(userQuestion);

        // Add AI's response to the active chat's messages
        activeChat.messages.push({ type: "ai", text: response });

        // Update conversation state
        setConversation([
          ...conversation,
          { type: "user", text: userQuestion },
          { type: "ai", text: response },
        ]);
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    } else {
      // If there's no active chat, simply add the user's question to the conversation
      //   setConversation([...conversation, { type: "user", text: userQuestion }]);
      const response = await openAI.ask(userQuestion);
      setConversation([
        ...conversation,
        { type: "user", text: userQuestion },
        { type: "ai", text: response },
      ]);
    }

    // Clear user input
    setUserQuestion("");

    // Hide dynamic questions
    setClickedQuestions(questions);
  };

  const handleTitleClick = (chat) => {
    // Add the clicked chat title to the conversation
    // setConversation((prevConversation) => [
    //     ...prevConversation,
    //     { type: "user", text: title },
    //   ]);
    setActiveChat(chat);
    // Clear user input and hide dynamic questions
    setUserQuestion("");
    setClickedQuestions(questions);
  };
  const handleNewChat = () => {
    setUserQuestion("");
    setClickedQuestions([]);
    setConversation([]);
    setActiveChat(null);
    setIsHovered(false);
  };
  // Filter out clicked questions from the list of questions to display
  const visibleQuestions = questions.filter(
    (question) => !clickedQuestions.includes(question)
  );
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (e.g., adding a newline)
      handleSubmit();
    }
  };
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex flex-col "
    >
      <div className="flex transition-all duration-200 h-[92.5vh] bg-blue-950/90">
        <div
          className={`${
            !openSide ? "w-[0%]" : "w-[20%] h-[92.5vh]  px-1"
          }  flex relative flex-col gap-4  transition-all duration-200 bg-blue-950/60`}
        >
          <p
            className={`${
              !openSide && "hidden"
            } text-2xl text-white p-2 font-bold`}
          >
            Last chats
          </p>
          <div
            className={`${
              !openSide && "hidden"
            } px-1 flex flex-col gap-2 w-full`}
          >
            {chats.map((chat) => (
              <div key={chat.id}>
                <ChatTitLe
                  title={chat.title}
                  onTitleClick={() => handleTitleClick(chat)}
                />
              </div>
            ))}
          </div>
          <div className="h-full flex items-center  absolute -right-6">
            {open ? (
              <span
                onClick={() => {
                  setOpenSide(!openSide);
                  setOpen(false);
                }}
                className="text-blue-600 cursor-pointer"
              >
                <MdOutlineArrowForwardIos size={22} />
              </span>
            ) : (
              <span
                onClick={() => {
                  setOpenSide(!openSide);
                  setOpen(true);
                }}
                className="text-blue-600 cursor-pointer"
              >
                <MdOutlineArrowBackIosNew size={22} />
              </span>
            )}
          </div>
        </div>
        <div
          className={`${
            !openSide ? " w-[70%]" : "w-[70%]"
          } flex flex-col items-center p-10 mx-auto`}
        >
          <header
            className={`${
              clickedQuestions === questions ? "hidden" : "flex"
            } text-4xl text-blue-600 font-bold mb-4  items-center gap-1`}
          >
            <img alt="logo" src={logo} className="w-9 h-9" />
            <span className="flex items-center text-white">Ask Azul AI</span>
            <img alt="logo" src={logo} className="w-9 h-9" />
          </header>

          <div className="h-[70vh] max-h-[70vh]  overflow-y-auto w-full">
            {clickedQuestions.length < 1 && (
              <div className="w-[80%] mx-auto">
                <Slider {...settings} className="flex gap-5">
                  {visibleQuestions.map((question, index) => (
                    <div
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className={`mx-[1.5%] cursor-pointer active:text-white bg-blue-500 active:bg-blue-500 text-white hover:bg-blue-600  hover:text-white mb-2 col-span-1 duration-150 flex justify-center  border border-blue-500 rounded-lg text-2xl  px-4 py-2 slick-slide-custom w-[97%] max-w-[97%]`}
                    >
                      <label className=" text-lg  duration-150 font-medium flex justify-center cursor-pointer">
                        {question}
                      </label>
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            <Chat activeChat={activeChat} setActiveChat={setActiveChat} setConversation={setConversation} conversation={conversation} />
          </div>

          <div className="mx-auto flex gap-2 w-[80%]">
            <div
              onClick={handleNewChat}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`${
                !isHovered ? "w-[50px] px-2 py-1" : "w-[170px] p-2 gap-1"
              }  cursor-pointer duration-200 transition-all flex justify-center items-center h-fit rounded-lg  bg-blue-600`}
            >
              <span className="relative text-white">
                <BsFillChatFill size={36} />
                <span className="absolute right-1 bottom-1 text-blue-600 font-semibold text-xl">
                  +
                </span>
              </span>
              <span
                className={`${
                  isHovered ? "flex" : "hidden"
                }whitespace-nowrap overflow-x-hidden text-gray-200 font-semibold`}
              >
                New Chat
              </span>
            </div>
            <div className=" w-full ">
              <div className="flex">
                <textarea
                  rows={4}
                  type="text"
                  className="caret-white  bg-transparent flex-1 border-[2px] text-white font-medium  border-blue-600 rounded-xl px-2 outline-none py-3"
                  placeholder="Ask Azul AI"
                  value={userQuestion}
                  onChange={handleUserQuestionChange}
                  onKeyDown={handleKeyDown}
                />
                {/* <div
                  onClick={handleSubmit}
                  className="bg-white hover:text-white active:bg-white active:text-blue-600 flex items-center justify-center rounded-r-xl border border-blue-600 border-l-0 px-2 py-1 text-blue-600 font-bold cursor-pointer hover:bg-blue-600 duration-300"
                >
                  <IoIosSend size={20} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
