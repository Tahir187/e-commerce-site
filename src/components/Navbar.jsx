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
  FaSort,
} from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts]);

  return (
    <nav className="navbar flex justify-around items-center mx-auto gap-2 pt-3 pb-3 text-white">
      {/* brand name with hamburger menu */}
      <div className="flex gap-2 px-2">
        <button
          type="button"
          className="sidebar-show-btn text-white"
          onClick={() => dispatch(setSidebarOn())}
        >
          <FaBars className="text-2xl lg:hidden" />
        </button>
        <Link to="/" className="navbar-brand flex text-2xl items-center gap-2">
          <span className="navbar-brand-ico">
            <FaShoppingBag className="text-2xl hidden lg:flex" />
          </span>
          <span className="navbar-brand-txt">
            <span className="font-semibold">E.</span>Com
          </span>
        </Link>
      </div>
      <div className="flex">
        <ul className="hidden lg:flex items-center justify-between">
          {categories.slice(0, 8).map((category, idx) => (
            <li className="ml-4" key={idx}>
              <Link
                to={`category/${category}`}
                className="text-white hover:text-orange-300 capitalize"
              >
                {category.replace("-", " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* search bar with cart*/}
      <div className="flex items-center justify-around gap-3">
        <div className="hover:text-orange-300">
          <Link to="/cart" className="cart-btn relative">
            <FaShoppingCart className="text-2xl text-whinhover:text-orange-300" />
            <div className="cart-items-value absolute text-xl top-[-20px] right-[-8px] flex text-center justify-center">
              {itemsCount}
            </div>
            <CartModal carts={carts} className="hidden" />
          </Link>
        </div>
        <div className="flex items-center px-2">
          <input
            type="text"
            className="text-gray-600 w-full
                 lg:w-80 h-10 rounded-md p-2 focus:outline-none"
            placeholder="Search your preferred items here"
            onChange={(e) => handleSearchTerm(e)}
          />
          <Link
            to={`search/${searchTerm}`}
            className="search-btn text-2xl"
          >
            <FaSearch className="text-gray-600 -ml-9" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
