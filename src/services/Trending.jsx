"use client"
import React, { useEffect, useState } from "react";
import TrendingMovies from "@/services/TrendingMovies";

function Trending() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [activeButton, setActiveButton] = useState("day");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/${activeButton}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Error Message : ", error);
      }
    };
    fetchMovies();
  }, [activeButton,apiKey]);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full xl:p-0 xl:w-[75%] ">
        <div className="w-full flex flex-col gap-2 p-2 xl:w-[75%] xl:flex-row xl:p-7 xl:gap-4">
          <p className="text-2xl text-center xl:text-4xl">Trending</p>
          <div className="flex justify-center rounded-full w-54 xl:w-44">
            <button
              className={`rounded-full w-[60px] xl:w-[85px] p-1 ${
                activeButton === "day"
                  ? "border border-[#072541] bg-[#072541] text-[#368A7F] transition duration-300 ease-in p-1"
                  : ""
              }`}
              onClick={() => handleButtonClick("day")}
            >
              Today
            </button>
            <button
              className={`rounded-full w-[95px] p-1${
                activeButton === "week"
                  ? "border border-[#072541] bg-[#072541] text-[#368A7F] transition duration-300 ease-in-out p-1"
                  : ""
              }`}
              onClick={() => handleButtonClick("week")}
            >
              This Week
            </button>
          </div>
        </div>
        <TrendingMovies movies={movies} />
      </div>
    </div>
  );
}

export default Trending;

