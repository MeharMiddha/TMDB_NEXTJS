"use client";
import React, { useEffect, useState } from "react";
import TrendingMovies from "@/services/TrendingMovies";

function Popular() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [activeButton, setActiveButton] = useState("popular");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${activeButton}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Error Message: ", error);
      }
    };
    fetchMovies();
  }, [activeButton, apiKey]);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full xl:p-0 xl:w-[75%]">
        <div className="w-full flex flex-col gap-2 p-1 xl:p-7 xl:flex-row xl:gap-4">
          <p className="text-2xl text-center xl:text-4xl">What's Popular</p>
          <div className="flex rounded-full p-2 justify-between w-54 xl:w-[420px]">
            <button
              className={`rounded-full w-[60px] xl:w-[70px] xl:p-2${
                activeButton === "popular"
                  ? "border border-[#072541] bg-[#072541] text-[#368A7F] transition duration-300 ease-in xl:p-2"
                  : ""
              }`}
              onClick={() => handleButtonClick("popular")}
            >
              Popular
            </button>
            <button
              className={`rounded-full w-[80px] xl:w-max xl:p-1${
                activeButton === "top_rated"
                  ? "border border-[#072541] bg-[#072541] text-[#368A7F] transition duration-300 ease-in-out xl:p-1"
                  : ""
              }`}
              onClick={() => handleButtonClick("top_rated")}
            >
              Top Rated
            </button>
            <button
              className={`rounded-full w-[110px] xl:w-[120px] xl:p-1${
                activeButton === "now_playing"
                  ? "border border-[#072541] bg-[#072541] text-[#368A7F] transition duration-300 ease-in-out xl:p-1"
                  : ""
              }`}
              onClick={() => handleButtonClick("now_playing")}
            >
              Now Playing
            </button>
            <button
              className={`rounded-full w-[80px] xl:w-[90px] xl:p-1${
                activeButton === "upcoming"
                  ? "border border-[#072541] bg-[#072541] text-[#368A7F] transition duration-300 ease-in-out xl:p-1"
                  : ""
              }`}
              onClick={() => handleButtonClick("upcoming")}
            >
              Upcoming
            </button>
          </div>
        </div>
        <TrendingMovies movies={movies} />
      </div>
    </div>
  );
}

export default Popular;
