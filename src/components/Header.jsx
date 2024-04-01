// Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BsFacebook } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const Header = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);
  return (
    <header
      className="text-white bg-gradient-to-br from-indigo-500 to to-purple-800 md:text-sm sticky top-0 z-10 shadow-lg" 
    >
      <div className="container">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
