import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarOn } from "../store/sidebarSlice";
import { getAllCategories } from "../store/categorySlice";
import {
  getAllCarts,
  getCartItemsCount,
  getCartTotal,
} from "../store/cartSlice";
import CartModal from "./CartModal";
import {
  FaBars,
  FaShoppingBag,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FaRegBell } from 'react-icons/fa'

const NewNavbar = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);
    const carts = useSelector(getAllCarts);
    const itemsCount = useSelector(getCartItemsCount);
    const [searchTerm,setSearchTerm] = useState("");

    const handleSearchTerm = (e) =>{
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    useEffect(()=>{
        dispatch(getCartTotal());
    },[carts])


    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    return (
      <header className="bg-[#121533] py-4 sm:px-10 px-6 font-sans min-h-[70px]">
        <div className="flex flex-wrap items-center lg:gap-y-2 gap-y-4 gap-x-4">
          <a href="/">
            <img src="https://readymadeui.com/readymadeui-white.svg" alt="logo" className="w-36" />
          </a>
          <div className="flex items-center ml-auto lg:order-1">
            <div className="flex items-center relative mr-8">
              <FaRegBell className="cursor-pointer hover:text-[#FFA726] inline-block text-white" />
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">0</span>
            </div>
            <input type="text" placeholder="Search something..." className="bg-gray-50 focus:bg-white w-full px-6 h-10 rounded outline-none text-sm" />
            <button id="toggle" className="lg:hidden ml-7" onClick={toggleMenu}>
              <FiMenu className="w-7 h-7 text-white" />
            </button>
          </div>
          <ul id="collapseMenu" className={`lg:flex lg:ml-8 max-lg:hidden ${menuOpen ? 'block' : 'hidden'} max-lg:w-full lg:space-x-4 max-lg:space-y-2 max-lg:my-4`}>
            <li className="max-lg:border-b max-lg:py-2 px-3"><a href="#" className="text-[#FFA726] hover:text-[#FFA726] text-[15px] block font-semibold">New</a></li>
            <li className="max-lg:border-b max-lg:py-2 px-3"><a href="#" className="text-white hover:text-[#FFA726] text-[15px] block font-semibold">Men</a></li>
            <li className="max-lg:border-b max-lg:py-2 px-3"><a href="#" className="text-white hover:text-[#FFA726] text-[15px] block font-semibold">Women</a></li>
            <li className="max-lg:border-b max-lg:py-2 px-3"><a href="#" className="text-white hover:text-[#FFA726] text-[15px] block font-semibold">Kids</a></li>
            <li className="max-lg:border-b max-lg:py-2 px-3"><a href="#" className="text-white hover:text-[#FFA726] text-[15px] block font-semibold">Shops</a></li>
          </ul>
        </div>
      </header>
    );
};

export default NewNavbar;
