import React from "react";
import Card from "@/card/Card";
import Link from "next/link";

function TrendingMovies({ movies }) {
  return (
    <div className="flex w-full overflow-x-auto gap-2 pl-2">
      {movies.map((item) => {
        return (
          <Link href={`/Details/${item.id}`} key={item.id}>
              <Card
                name={item.title}
                date={item.release_date}
                imageUrl={item.poster_path}
                vote_average={item.vote_average}
              />
          </Link>
        );
      })}
    </div>
  );
}

export default TrendingMovies;
