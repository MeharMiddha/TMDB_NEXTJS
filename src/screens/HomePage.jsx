import React from "react";
import SearchMovies from "@/services/SearchMovies";
import Oscar from "@/components/Oscar";
import Trending from "@/services/Trending";
import Popular from "@/services/Popular";

function HomePage() {
  return (
    <div>
      <SearchMovies />
      <Oscar />
      <Trending />
      <Popular />
    </div>
  );
}

export default HomePage;
