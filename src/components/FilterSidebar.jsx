import React from "react";

const FilterSidebar = ({onSortByChange, onFilterByRating, onClearFilters}) => {

  return (
    <>
      <nav className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Filter Out</h2>
        <ul className="flex flex-col md:flex-row gap-2 text-xl font-medium text-center">
            <li className="border p-2 bg-gray-100 rounded-md">
                <button onClick={()=> onSortByChange("lowest")}>Low Price</button>    
            </li>
            <li className="border p-2 bg-gray-100 rounded-md ">
                <button onClick={()=> onSortByChange("highest")}>High Price</button>
            </li>
            <li className="border p-2 bg-gray-100 rounded-md ">
                <button onClick={()=> onFilterByRating(4)}>Rating</button>
            </li>
            <li className="border p-2 bg-gray-100 rounded-md">
            <button onClick={onClearFilters}>Clear Filters</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default FilterSidebar;
