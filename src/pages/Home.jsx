import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import Footer from "../components/Footer";
import { FaCode } from "react-icons/fa";
import { TbArrowsMoveVertical } from "react-icons/tb";
// import Typewriter from "react-typewriter-effect";
import logo from "../images/uir.jpg";
import { MdOutlineLanguage } from "react-icons/md";
import { BsFillChatFill } from "react-icons/bs";
import { chats, questions } from "../data";
import Slider from "react-slick";
import ChatTitLe from "../components/ChatTitLe";
import { RiTranslate2 } from "react-icons/ri";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSquare } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Chat from "../components/Chat";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLang, setLangUser } from "../redux/optionsSlice";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const { lang, langUser } = useSelector((state) => state.options);
  const { mode } = useSelector((state) => state.themode);
  const [userQuestion, setUserQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [openSide, setOpenSide] = useState(true);
  const [language, setLanguage] = useState(lang);
  const [answers, setAnswers] = useState({});
  const [conversation, setConversation] = useState([]);
  const [clickedQuestions, setClickedQuestions] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // Define the activeChat state
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(mode);
  const [theLang, setTheLang] = useState(langUser);
  const [showLangs, setShowLangs] = useState(false);
  const [theLoading, setTheLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);
  useEffect(() => {
    setTheLang(langUser);
  }, [langUser]);
  useEffect(() => {
    setTheme(mode);
  }, [mode]);
  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // const openAI = {
  //   ask: async (question) => {
  //     // Placeholder for sending question to OpenAI and receiving response
  //     return "Placeholder response for question: " + question;
  //   },
  // };

  const handleQuestionClick = (question) => {
    setTheLoading(true);
    setLoading(true);
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
        setTyping(true)
        setLoading(false);
        setValue(res.data.result.answer.answerContent)
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
    setLoading(true);
    // Check if there's an active chat
    if (activeChat) {
      setTheLoading(true);
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
          setTyping(true)
          setLoading(false);
          setValue(res.data.result.answer.answerContent)
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
      setTheLoading(true);
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
          setTyping(true)
          setLoading(false);
          setValue(res.data.result.answer.answerContent)
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
  const handleStop = () => {
    console.log("STOP");
  };
  const dispatch = useDispatch();
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    dispatch(setLang(selectedLanguage));
    setShowLangs(false);
  };
  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-black"
      } flex flex-col z-40`}
    >
      <div
        className={`${
          theLang === "arabic" ? "flex-row-reverse" : ""
        } flex transition-all duration-200 h-[92.5vh] ${
          theme === "light" ? "bg-white" : "bg-black"
        }`}
      >
        <div
          dir={theLang === "arabic" ? "rtl" : ""}
          className={` ${
            !openSide ? "w-[0%]" : "w-[20%] h-[92.5vh]  px-1"
          }  flex relative flex-col gap-4 border-t-[2px]  transition-all duration-200 ${
            theme === "light"
              ? "bg-[#808080] border-t-white"
              : "bg-[#808080] border-t-black"
          }`}
        >
          <p
            className={`${!openSide && "hidden"} text-2xl p-2 font-semibold ${
              theme === "light" ? "text-white" : "text-black"
            } `}
          >
            {theLang === "english"
              ? "Last chats"
              : theLang === "french"
              ? "dernières discussions"
              : "المحداثات الأخيرة"}
          </p>
          <div
            className={`${
              !openSide && "hidden"
            } px-1 flex flex-col gap-2 w-full`}
          >
            {chats.map((chat) => (
              <div key={chat.id}>
                <ChatTitLe
                  theme={theme}
                  title={chat.title}
                  onTitleClick={() => handleTitleClick(chat)}
                />
              </div>
            ))}
          </div>
          <div
            className={`h-full flex items-center  absolute ${
              theLang === "arabic" ? "-left-6" : "-right-6"
            }`}
          >
            {theLang !== "arabic" && (
              <div>
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
            )}

            {theLang === "arabic" && (
              <div>
                {open ? (
                  <span
                    onClick={() => {
                      setOpenSide(!openSide);
                      setOpen(false);
                    }}
                    className="text-[#808080] cursor-pointer"
                  >
                    <MdOutlineArrowBackIosNew size={22} />
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setOpenSide(!openSide);
                      setOpen(true);
                    }}
                    className="text-[#808080] cursor-pointer"
                  >
                    <MdOutlineArrowForwardIos size={22} />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            !openSide ? " w-[70%]" : "w-[70%]"
          } flex flex-col items-center p-10 mx-auto`}
        >
          <div className="w-full relative justify-center items-center">
            <header
              className={`${
                clickedQuestions === questions ? "hidden" : "flex"
              } text-4xl text-blue-600 flex-col font-bold mb-4 items-center gap-1 absolute top-[120px] left-2/4 -translate-x-2/4`}
            >
              <img alt="logo" src={logo} className="w-11 h-11 rounded-full" />
              <span className="text-[#808080] ">
                {theLang === "french"
                  ? "Demandez à Azul AI"
                  : theLang === "english"
                  ? "Ask Azul AI"
                  : "إسأل أزول إ أي"}
              </span>
              {/* <img alt="logo" src={logo} className="w-9 h-9" /> */}
            </header>
          </div>

          <div className="h-[70vh] max-h-[70vh] relative overflow-y-auto w-full">
            {clickedQuestions.length < 1 && (
              <div className="w-[80%] mx-auto grid grid-cols-2 gap-2 absolute bottom-20 left-2/4 -translate-x-2/4">
                {/* <Slider {...settings} className="flex gap-5"> */}
                {visibleQuestions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className={`text-white cursor-pointer  col-span-1 duration-150 flex  bg-[#808080] rounded-lg hover:bg-[#808080]/80  px-4 py-2 slick-slide-custom`}
                  >
                    <div className="flex flex-col">
                      <label className=" text-base  duration-150 font-medium flex cursor-pointer line-clamp-1">
                        {question}
                      </label>
                      {/* <p className="line-clamp-1">ssssssssssssssssssssssssss</p> */}
                    </div>
                  </div>
                ))}
                {/* </Slider> */}
              </div>
            )}
            <Chat
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setConversation={setConversation}
              conversation={conversation}
              setTheLoading={setTheLoading}
              setLoading={setLoading}
              setTyping={setTyping}
              typing={typing}
              value={value} setValue={setValue}
            />
          </div>
          <div className="mx-auto flex gap-2 ltr w-[80%]">
            <div className="flex flex-col gap-2">
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
                  }whitespace-nowrap overflow-x-hidden  font-semibold ${
                    theme === "light" ? "text-white" : "text-white"
                  }`}
                >
                  New Chat
                </span>
              </div>
              <div className="relative">
                <span
                  onClick={() => setShowLangs(!showLangs)}
                  className={`${
                    !isHovered ? " px-2 py-1 " : "  px-2 py-1"
                  } text-white cursor-pointer duration-200 transition-all flex justify-center w-[50px] items-center h-fit rounded-lg  bg-[#808080]`}
                >
                  <RiTranslate2 size={30} />
                  {/* <span className="absolute right-1 bottom-1 text-[#808080] font-semibold text-xl">
                  +
                </span> */}
                </span>
                {showLangs && (
                  <select
                    className={`${isHovered ? "left-[-57%]" : "left-[-200%]"} ${
                      theme === "light"
                        ? "text-white bg-[#808080]"
                        : "text-white bg-[#808080]"
                    } 
                    p-2 absolute  top-0 rounded border font-semibold cursor-pointer outline-none`}
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="arabic">Arabic</option>
                  </select>
                )}
              </div>
            </div>
            <div className=" w-full ">
              <div className="flex relative">
                <textarea
                  dir={theLang === "arabic" ? "rtl" : ""}
                  rows={4}
                  type="text"
                  className={`${
                    theme === "light"
                      ? "text-black caret-black"
                      : "text-white caret-white"
                  } ${
                    theLang === "arabic" ? "pr-2 pl-10" : "pl-2 pr-10"
                  } bg-transparent flex-1 border-[2px] font-medium  border-[#808080] rounded-xl outline-none py-3`}
                  placeholder={
                    theLang === "french"
                      ? "Demandez à Azul AI"
                      : theLang === "english"
                      ? "Ask Azul AI"
                      : "إسأل أزول إ أي"
                  }
                  value={userQuestion}
                  onChange={handleUserQuestionChange}
                  onKeyDown={handleKeyDown}
                />
                {!theLoading ? (
                  <div
                    onClick={handleSubmit}
                    className={`${
                      theLang === "arabic" ? "left-2" : "right-2"
                    } bg-[#808080] absolute top-2  hover:bg-gray-500 flex items-center justify-center rounded-lg px-2 py-1 text-white font-bold cursor-pointer duration-300`}
                  >
                    <IoIosSend size={20} />
                  </div>
                ) : theLoading && loading ? (
                  <div
                    className={`${
                      theLang === "arabic" ? "left-2" : "right-2"
                    } bg-[#808080] absolute top-2 hover:bg-gray-500 flex items-center justify-center rounded-full p-1  text-white font-bold cursor-pointer duration-300 animate-spin`}
                  >
                    <AiOutlineLoading3Quarters size={18} />
                  </div>
                ) : (
                  <div
                    onClick={handleStop}
                    className={`${
                      theLang === "arabic" ? "left-2" : "right-2"
                    } bg-[#808080] absolute top-2 hover:bg-gray-500 flex items-center justify-center rounded-lg px-2 py-1 text-white font-bold cursor-pointer duration-300`}
                  >
                    <FaSquare size={18} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
