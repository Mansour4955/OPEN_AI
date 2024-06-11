import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MyChats from "./pages/MyChats";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  // const { langUser } = useSelector((state) => state.options);

  // const [theLang, setTheLang] = useState(langUser);
  // useEffect(() => {
  //   setTheLang(langUser);
  // }, [langUser]);

  return (
    <div
      // dir={theLang === "arabic" ? "rtl" : "ltr"}
      className="bg-white h-screen "
    >
      <BrowserRouter>
        <Header />
        <div className="h-[80vh]">
          <Routes>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="chats" element={<MyChats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
