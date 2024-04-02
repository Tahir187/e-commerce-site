import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSidebarStatus, setSidebarOff } from "../store/sidebarSlice";
import { RxCross2 } from "react-icons/rx";
import { fetchAsyncCategories, getAllCategories } from "../store/categorySlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  return (
    <aside
      className={`sidebar fixed top-0 left-0 w-60 h-full text-white bg-gradient-to-br from-indigo-500 to to-purple-800 shadow-md transform transition-transform ${
        isSidebarOn ? "" : "-translate-x-full"
      }`}
      style={{ zIndex: 9999, position: "fixed", top: 0, left: 0 }}
    >
      <button
        onClick={() => dispatch(setSidebarOff())}
        className="absolute top-4 right-4 text-white hover:text-orange-500"
      >
        <RxCross2 className="text-2xl"/>
      </button>
      <div className="sidebar-cnt p-8">
        <div className="cat-title text-xl uppercase pb-4">All Categories</div>
        <ul className="cat-list overflow-y-scroll h-[calc(100vh-4rem)]">
          {categories.map((category, idx) => (
            <li key={idx} className="py-2 border-b border-gray-200">
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
    </aside>
  );
};

export default Sidebar;
