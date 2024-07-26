"use client";
import React, { useEffect, useState } from "react";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Error Fetching movies: ", error);
      }
    };
    fetchBackgroundImage();
  }, [apiKey]);
  useEffect(() => {
    if (movies.length > 0) {
      const random = Math.floor(Math.random() * movies.length);
      setRandomMovie(random);
    }
  }, [movies]);

  return (
    <div className="flex items-center justify-center">
      <div
        className="w-full flex flex-col justify-center h-72 xl:w-[75%] xl:h-96 p-10 bgimg"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original${movies[randomMovie]?.poster_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <p className="text-[#FFF] text-4xl font-light xl:text-5xl xl:font-bold">
          Welcome.
        </p>
        <p className="text-[#FFF] text-xl font-light xl:text-2xl xl:font-semibold">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <div className="w-full flex flex-col gap-2 mt-10 xl:flex-row">
          <input
            type="text"
            className="rounded-3xl h-12 text-lg w-full outline-none p-5 text-[rgba(0,0,0,0.5)]"
            placeholder="Search for a movie, tv show, person......"
          />
          <input
            type="submit"
            value="Search"
            className="bg-gradient-to-r from-[rgba(30,213,169,1)] to-[rgba(1,180,228,1)] text-[#FFF] rounded-full w-[100%] p-[8px] text-[18px] xl:w-36 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchMovies;
