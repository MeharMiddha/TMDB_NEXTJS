"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import MovieCard from "@/card/MovieCard";
import TopBilledCast from "@/services/TopBilledCast";
import StarCrew from "@/services/StarCrew";
import Trailer from "@/services/Trailer";

function MovieDetails() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const { id } = useParams();
  const [movies, setMovies] = useState(null);
  const trailerRef = useRef(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log("Error Message : ", error);
      }
    };
    fetchMovies();
  }, [id, apiKey]);
  const handlePlayTrailer = () => {
    setPlayTrailer(true);
    trailerRef.current.scrollIntoView({ behavior: "smooth" });
  };
  if (!movies) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <MovieCard movies={movies} onPlayTrailer={handlePlayTrailer} />
      <TopBilledCast movies={movies} />
      <StarCrew movies={movies} />
      <div ref={trailerRef}>
        <Trailer movies={movies} playTrailer={playTrailer} />
      </div>
    </div>
  );
}

export default MovieDetails;