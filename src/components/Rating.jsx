import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick }) => {
    
  return <>
    {
        [...Array(5)].map((_,i) =>(
            <span key={i} onClick={()=> onClick(i)}>
                {rating > i ? (
                    <AiFillStar className="text-2xl cursor-pointer" />
                ) : (
                    <AiOutlineStar className="text-2xl cursor-pointer"/>
                )}
            </span>
        ))
    }
  </>;
};

export default Rating;
