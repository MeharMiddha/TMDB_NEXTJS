"use client";
import React, { useState, useEffect } from "react";
import StarCard from "@/card/StarCard";
import Link from "next/link";

function TopBilledCast({ movies }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [starcast, setStarcast] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movies.id}/credits?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        const data = await response.json();
        const filteredStarcast = data.cast.filter(
          (item) => item.profile_path !== null && item.character !== null
        );
        setStarcast(filteredStarcast);
      } catch (error) {
        console.log("Error Message : ", error);
      }
    };
    fetchMovies();
  }, [movies.id,apiKey]);
  console.log(starcast);
  return (
    <div className="p-2 xl:p-8">
      <div className="flex flex-col gap-4">
        <p className="text-[20px] font-semibold">Top Billed Cast</p>
        <div className="flex w-full overflow-x-auto gap-4">
          {starcast &&
            starcast.map((actor) => (
              <Link href={`/Biography/${actor?.id}`} key={actor?.id}>
                <StarCard
                  name={actor.name}
                  character={actor.character}
                  imageUrl={actor.profile_path}
                />
              </Link>
            ))}
        </div>
        <p className="text-[17px] font-medium">Full Cast & Crew</p>
        <hr />
      </div>
    </div>
  );
}

export default TopBilledCast;
