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
import axios from "axios";
import { useSelector } from "react-redux";
const Home = () => {
  const { lang } = useSelector((state) => state.options);
  const { mode } = useSelector((state) => state.themode);
  const [userQuestion, setUserQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [openSide, setOpenSide] = useState(true);

  const [answers, setAnswers] = useState({});
  const [conversation, setConversation] = useState([]);
  const [clickedQuestions, setClickedQuestions] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // Define the activeChat state
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(mode);
  useEffect(() => {
    setTheme(mode);
  }, [mode]);
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
  // const openAI = {
  //   ask: async (question) => {
  //     // Placeholder for sending question to OpenAI and receiving response
  //     return "Placeholder response for question: " + question;
  //   },
  // };

  const handleQuestionClick = (question) => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { type: "user", text: question },
    ]);

    const postData = {
      question: question,
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
        setConversation((prevConversation) => [
          ...prevConversation,
          {
            type: "ai",
            text: res.data.result.answer.answerContent,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
    setClickedQuestions(questions); // Mark all questions as clicked
  };

  const handleUserQuestionChange = (e) => {
    setUserQuestion(e.target.value);
    setIsHovered(false);
  };

  const handleSubmit = async () => {
    // Check if there's an active chat
    if (activeChat) {
      setActiveChat((prev) => ({
        ...prev,
        messages: [...prev.messages, { type: "user", text: userQuestion }],
      }));

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
    } else {
      setConversation((conversation) => [
        ...conversation,
        { type: "user", text: userQuestion },
      ]);

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
          setConversation((conversation) => [
            ...conversation,
            { type: "ai", text: res.data.result.answer.answerContent },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
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
      className={`${theme === "light" ? "bg-white" : "bg-black"} flex flex-col z-40`}
    >
      <div
        className={`flex transition-all duration-200 h-[92.5vh] ${
          theme === "light" ? "bg-white" : "bg-black"
        }`}
      >
        <div
          className={`${
            !openSide ? "w-[0%]" : "w-[20%] h-[92.5vh]  px-1"
          }  flex relative flex-col gap-4  transition-all duration-200 ${
            theme === "light" ? "bg-[#808080]/70" : "bg-[#808080]/70"
          }`}
        >
          <p
            className={`${
              !openSide && "hidden"
            } text-2xl p-2 font-semibold ${theme === "light" ? "text-white" : "text-white"}`}
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
                className="text-[#808080] cursor-pointer"
              >
                <MdOutlineArrowForwardIos size={22} />
              </span>
            ) : (
              <span
                onClick={() => {
                  setOpenSide(!openSide);
                  setOpen(true);
                }}
                className="text-[#808080] cursor-pointer"
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

            <Chat
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setConversation={setConversation}
              conversation={conversation}
            />
          </div>

          <div className="mx-auto flex gap-2 w-[80%]">
            <div
              onClick={handleNewChat}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`${
                !isHovered ? "w-[50px] px-2 py-1" : "w-[170px] p-2 gap-1"
              }  cursor-pointer duration-200 transition-all flex justify-center items-center h-fit rounded-lg  bg-[#808080]`}
            >
              <span className="relative text-white">
                <BsFillChatFill size={36} />
                <span className="absolute right-1 bottom-1 text-[#808080] font-semibold text-xl">
                  +
                </span>
              </span>
              <span
                className={`${
                  isHovered ? "flex" : "hidden"
                }whitespace-nowrap overflow-x-hidden  font-semibold ${theme === "light" ? "text-white": "text-white"}`}
              >
                New Chat
              </span>
            </div>
            <div className=" w-full ">
              <div className="flex relative">
                <textarea
                  rows={4}
                  type="text"
                  className={`${theme === "light" ? "text-black caret-black": "text-white caret-white"} bg-transparent flex-1 border-[2px] font-medium  border-[#808080] rounded-xl px-2 outline-none py-3`}
                  placeholder="Ask Azul AI"
                  value={userQuestion}
                  onChange={handleUserQuestionChange}
                  onKeyDown={handleKeyDown}
                />
                <div
                  onClick={handleSubmit}
                  className="bg-[#808080] absolute top-2 right-2 hover:bg-gray-500 flex items-center justify-center rounded-lg px-2 py-1 text-white font-bold cursor-pointer duration-300"
                >
                  <IoIosSend size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
