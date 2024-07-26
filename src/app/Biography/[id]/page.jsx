"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PersonDetailsCard from "@/card/PersonDetailsCard";

function PersonDetail() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const { id } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!id) return; // Prevent running fetch if id is not available yet
    const fetchPersonDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.log("Error Message: ", error);
      }
    };
    fetchPersonDetails();
  }, [id, apiKey]);

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PersonDetailsCard info={info} />
    </div>
  );
}

export default PersonDetail;
