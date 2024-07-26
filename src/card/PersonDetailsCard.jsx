"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import KnownCard from "@/card/KnownCard";

function PersonDetailsCard({ info }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [knownFor, setKnownFor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch person details");
        }
        const data = await response.json();
        setKnownFor(data.cast);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPersonDetails();
  }, [id,apiKey]);

  if (!knownFor) {
    return <div>Loading...</div>;
  }
  document.title = info?.name;
  return (
    <div className="container mx-auto">
      <div className="flex flex-col p-4 gap-6 xl:p-10 xl:flex-row">
        {info?.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${info.profile_path}`}
            alt={info?.name}
            className="rounded-t-xl w-[300px] xl:w-[300px] min-w-[300px] h-[450px]"
          />
        )}
        <div className="w-full xl:w-[75%] p-2 xl:gap-4">
          <p className="text-[30px] font-bold">{info?.name}</p>
          <div className="flex flex-col gap-1 xl:gap-1">
            <p className="text-[20px] font-semibold">Biography</p>
            <p className="xl:w-[70%]">{info?.biography}</p>
          </div>
          <div className="flex gap-5">
            <div>
              <p className="font-medium">Known For</p>
              <p className="font-light">{info?.known_for_department}</p>
            </div>
            <div>
              <p className="font-medium">Place of Birth</p>
              <p className="font-light">{info?.place_of_birth}</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold mb-4">Known For</p>
            <div className="overflow-x-auto">
              <div className="flex gap-4">
                {knownFor.map((item,index) => (
                  <Link href={`/Details/${item.id}`} key={index}>
                    <KnownCard
                      key={item.id}
                      name={item.title}
                      imageUrl={item.poster_path}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetailsCard;
