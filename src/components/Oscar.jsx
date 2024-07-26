"use client";
import React from "react";

function Oscar() {
  return (
    <div className="flex justify-center items-center xl:p-0">
      <div className="w-full h-44 flex justify-center flex-col gap-4 p-7 bg-gradient-to-b from-[#4859AB] to-[#80B1CD] xl:w-[75%]">
        <img
          src="https://www.themoviedb.org/assets/2/awards-preview/oscars-2024-title-f69161f90ed90871e9fe79439ea7e9280e03f3cb896b8d35d5d37b6711d00913.svg"
          alt=""
          className="w-[200px] xl:w-[300px]"
        />
        <button className="border border-[#FFF] rounded-full p-2 w-[50%] text-[#FFF] text-1xl xl:w-[20%]">
          View The Winners →
        </button>
      </div>
    </div>
  );
}

export default Oscar;
