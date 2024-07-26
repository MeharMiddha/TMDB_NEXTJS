import React from "react";

function Card({ name, character, imageUrl }) {
  return (
    <div className="flex flex-row pb-[20px]">
      <div className="w-[150px] h-[300px] shadow-lg rounded-xl pb-2">
        <img
          className="rounded-t-xl"
          src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
          alt=""
        />
        <p className="text-[16px] font-bold pl-3">{name}</p>
        <p className="text-[13px] font-light pl-3">{character}</p>
      </div>
    </div>
  );
}

export default Card;
