"use client";
import React, { useState, useEffect } from "react";
import StarCard from "@/card/StarCard";
import Link from "next/link";

function StarCrew({ movies }) {
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
        const filteredStarcast = data.crew.filter(
          (item) => item.profile_path !== null && item.department !== null
        );
        setStarcast(filteredStarcast);
      } catch (error) {
        console.log("Error Message: ", error);
      }
    };
    fetchMovies();
  }, [movies.id, apiKey]);

  return (
    <div className="p-2 xl:pl-8">
      <div className="flex flex-col gap-4">
        <p className="text-[20px] font-semibold">Crew</p>
        <div className="flex w-full overflow-x-auto gap-4">
          {starcast &&
            starcast.map((actor,id) => (
              <Link href={`/Biography/${actor?.id}`} key={id}>
                  <StarCard
                    name={actor.name}
                    character={actor.department}
                    imageUrl={actor.profile_path}
                  />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default StarCrew;
