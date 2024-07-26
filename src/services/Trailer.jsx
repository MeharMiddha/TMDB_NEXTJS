"use client";
import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
function Trailer({ movies, playTrailer }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [trailer, setTrailer] = useState(null);
  const playRef = useRef(null);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let url = `https://api.themoviedb.org/3/movie/${movies.id}/videos?api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        const filteredTrailer = data.results.find(
          (item) => item.site === "YouTube" && item.type === "Trailer"
        );
        setTrailer(filteredTrailer);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  },[apiKey]);
  useEffect(() => {
    if (playTrailer && playRef.current) {
      playRef.current.internalPlayer.playVideo();
    }
  }, [playTrailer]);
  if (!trailer) return null;
  const videoOptions = {
    height: "400",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };
  const videoId = trailer.key;
  return (
    <div className="p-2 w-full flex overflow-x-auto xl:pl-8 xl:pb-2">
      <YouTube videoId={videoId} opts={videoOptions} ref={playRef} />
      <img
        src={`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`}
        alt=""
        className="h-[400px]"
      />
      <img
        src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
        alt=""
        className="h-[400px] w-[500px]"
      />
    </div>
  );
}
export default Trailer;
