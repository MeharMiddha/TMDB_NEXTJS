"use client";
import React, { useState, useEffect, useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaHeart, FaBookmark, FaBars } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import { UserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation';

function MovieCard({ movies, onPlayTrailer }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [providers, setProviders] = useState(null);
  const {
    favourites,
    addToFavourites,
    removeFromFavourites,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    data,
  } = useContext(UserContext);
  const router = useRouter(); 

  const isFavourite = favourites.some((item) => item.id === movies.id);
  const isWatchlisted = watchlist.some((item) => item.id === movies.id);

  const handleFavouritesToggle = () => {
    if (data.username !== "" && data.password !== "") {
      if (isFavourite) removeFromFavourites(movies);
      else addToFavourites(movies);
    } else {
      alert("Please login to add to favorites.");
      router.push("/Login");
    }
  };

  const handleWatchlistToggle = () => {
    if (data.username !== "" && data.password !== "") {
      if (isWatchlisted) removeFromWatchlist(movies);
      else addToWatchlist(movies);
    } else {
      alert("Please login to add to watchlist.");
      router.push("/Login");
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movies.id}/watch/providers?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        const data = await response.json();
        if (
          data.results &&
          data.results.US &&
          data.results.US.buy &&
          data.results.US.buy.length > 0
        ) {
          setProviders(data.results.US.buy[0]);
        } else {
          setProviders(null);
        }
      } catch (error) {
        console.log("Error Message : ", error);
      }
    };
    fetchMovies();
  }, [apiKey, movies.id]);

  useEffect(() => {
    document.title = movies.original_title;
  }, [movies.original_title]);

  const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getPathColor = (vote) => {
    if (vote < 4.5) return "red";
    if (vote < 7) return "#CFD331";
    return "green";
  };

  return (
    <div
      className="flex flex-col gap-4 w-full p-12 bg-slate-400 xl:flex-row xl:p-8 xl:mt-10 background-bottom-right"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movies?.backdrop_path})`,
      }}
    >
      <div className="flex flex-col rounded-full">
        <img
          className="w-[300px] min-w-[300px] h-[450px] overflow-hidden"
          src={`https://image.tmdb.org/t/p/w500${movies?.poster_path}`}
          alt={movies?.title}
        />
        {providers && (
          <div className="flex flex-row gap-2 justify-center items-center p-2 bg-[#022540]">
            <img
              src={`https://image.tmdb.org/t/p/w500${providers?.logo_path}`}
              alt=""
              className="w-[50px] h-[50px] relative p-1"
            />
            <div className="flex flex-col p-1">
              <p className="text-[#9CA9B2] text-[14px]">
                Available to Rent or Buy
              </p>
              <p className="text-[#FFF] text-[16px]">Watch Now</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <p className="text-[30px] font-bold text-[#FFF]">
            {movies?.original_title}
          </p>
          <p className="text-[30px] text-[#FFF] font-light">
            ({movies?.release_date.slice(0, 4)})
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-[#FFF]">
            {movies?.release_date} (
            {(movies.production_companies &&
              movies.production_companies[0] &&
              movies.production_companies[0].origin_country) ||
              "IN"}
            )
          </p>
          <p className="text-[#FFF]">
            {movies?.genres.map((genre) => (
              <span key={genre?.id}>{genre?.name} </span>
            ))}
          </p>
          <p className="text-[#FFF]">{convertRuntime(movies?.runtime)}</p>
        </div>
        <div className="flex gap-10">
          <div className="flex items-center gap-2 mt-4">
            <div className="w-14">
              <CircularProgressbar
                value={Math.round(movies?.vote_average * 10, 1)}
                text={Math.round(movies?.vote_average * 10, 1) + "%"}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: getPathColor(movies.vote_average),
                  trailColor: "gray",
                  textSize: "28px",
                  backgroundColor: "#022540",
                  backgroundPadding: 6,
                })}
                background
                className="transition-transform cursor-pointer hover:scale-110"
              />
            </div>
            <p className="font-medium text-[15px] w-5 text-[#FFF]">
              User Score
            </p>
          </div>
          <button className="bg-[#022540] text-[#FFF] h-9 text-sm p-2 mt-6 rounded-3xl transition-transform hover:scale-110">
            What's Your{" "}
            <span className="border-b-2 border-blue-400 hover:border-blue-600">
              Vibe
            </span>
            ?
          </button>
        </div>
        <div className="flex flex-row gap-8 items-center mt-3">
          <span
            className={`p-1 md:p-2 xl:p-4 rounded-full ${
              isFavourite ? "bg-green-500" : "bg-[#022540]"
            }`}
            onClick={handleFavouritesToggle}
          >
            <FaHeart className="text-white text-xs md:text-sm" />
          </span>
          <span
            className={`p-1 md:p-2 xl:p-4 rounded-full ${
              isWatchlisted ? "bg-green-500" : "bg-[#022540]"
            }`}
            onClick={handleWatchlistToggle}
          >
            <FaBookmark className="text-white text-xs md:text-sm" />
          </span>
          <span className="bg-[#022540] p-1 md:p-2 xl:p-4 rounded-full">
            <FaBars className="text-white text-xs md:text-sm" />
          </span>
          <button
            className="flex flex-row gap-1 md:gap-2 text-white text-xs md:text-sm transition-transform hover:scale-110"
            onClick={onPlayTrailer}
          >
            <BsPlayFill className="text-lg md:text-2xl" /> Play Trailer
          </button>
        </div>
        <div className="mt-5">
          <p className="text-[#9CA9B2] font-extralight">{movies?.tagline}</p>
        </div>
        <div className="flex gap-2 flex-col mt-2">
          <p className="text-[#FFF] text-[20px]">Overview</p>
          <p className="text-[#FFF] font-extralight xl:w-[50%]">
            {movies.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
