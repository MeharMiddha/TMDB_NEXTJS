"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { Hooks } from "@/debounce/Hooks";

function SearchData({ isSearch, visibility }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [movies, setMovies] = useState([]);
  const debouncedSearch = Hooks(isSearch);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=movie`;
        if (isSearch) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            debouncedSearch
          )}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        const data = await response.json();
        setMovies([...data.results]);
      } catch (error) {
        console.log("Error Message : ", error);
      }
    };
    fetchMovies();
  }, [debouncedSearch, apiKey]);
  return (
    <div>
      {movies.length === 0 ? (
        <div className="text-2xl text-center w-full">No Results</div>
      ) : (
        movies.map((item) => {
          return (
            <div key={item.id} className="flex flex-col text-[15px] gap-1">
              <Link
                href={`/Details/${item.id}`}
                onClick={() => visibility(false)}
              >
                <p className="flex flex-row items-center gap-2 xl:pl-[260px] xl:pr-[40px]">
                  <FaSearch className="text-gray-500" />
                  {item.title}
                </p>
              </Link>
              <hr className="w-full border-t border-gray-300" />
            </div>
          );
        })
      )}
    </div>
  );
}

export default SearchData;
