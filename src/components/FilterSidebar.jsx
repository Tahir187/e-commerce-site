import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FilterSidebar = () => {

  return (
    <>
      <nav className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Filter Out</h2>
        <ul className="flex gap-2 text-xl font-medium">
            <li className="border p-2 bg-gray-300 rounded-md">
                <Link to={'/'}>Low Price</Link>    
            </li>
            <li className="border p-2 bg-gray-300 rounded-md ">
                <Link to={'/'}>High Price</Link>
            </li>
            <li className="border p-2 bg-gray-300 rounded-md ">
                <Link to={'/'}>Rating</Link>
            </li>
        </ul>
      </nav>
    </>
  );
};

export default FilterSidebar;
