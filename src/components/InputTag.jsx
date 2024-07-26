"use client";
import React, { useState } from "react";
import SearchData from "@/services/SearchData";
import { FaTimes } from "react-icons/fa";

function InputTag({ active, visibility }) {
  const [isSearch, setIsSearch] = useState("");
  const handleChange = (event) => {
    setIsSearch(event.target.value);
  };
  const handleSearch = () => {
    setIsSearch("");
  };
  return (
    <div
      className={
        active ? "bg-white absolute top-16 w-full z-1 rounded-lg" : "hidden"
      }
    >
      <input
        type="text"
        placeholder="&#128269; Search for a movie, tv show, person..."
        className="bg-white w-full h-8 outline-none xl:h-10 xl:pl-[260px] xl:pr-[40px]"
        value={isSearch}
        onChange={handleChange}
      />
      {isSearch && (
        <FaTimes
          className="absolute right-4 top-3 text-gray-300 cursor-pointer"
          onClick={handleSearch}
        />
      )}
      <SearchData isSearch={isSearch} visibility={visibility} />
    </div>
  );
}

export default InputTag;
