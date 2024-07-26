"use client";
import React, { useContext } from "react";
import ListCard from "@/card/ListCard";
import { UserContext } from "@/context/UserContext";

function Favourites() {
  const { favourites } = useContext(UserContext);
  document.title = "Favourites";
  return (
    <div className="h-[100%] min-h-[700px]">
      <p className="text-[40px] justify-center flex font-bold m-2 xl:p-4">
        My Favourites:{" "}
      </p>
      {favourites.length > 0 ? (
        favourites.map((item) => (
          <ListCard key={item.id} item={item} type={"favourites"} />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img
            src="https://www.shutterstock.com/shutterstock/videos/1082735041/thumb/6.jpg?ip=x480"
            alt=""
            className="w-[700px]"
          />
          <p className="text-[25px] font-semibold mb-5">
            Your TMDB Favourites Is Empty.!
          </p>
        </div>
      )}
    </div>
  );
}

export default Favourites;
