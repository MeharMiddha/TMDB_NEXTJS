import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

function ListCard({ item, type }) {
  const { removeFromFavourites, removeFromWatchlist } = useContext(UserContext);

  const handleRemove = () => {
    if (type === "watchlist") {
      removeFromWatchlist(item);
    } else {
      removeFromFavourites(item);
    }
  };

  return (
    <div className="items-center justify-center flex mb-5">
      <div className="flex rounded-2xl w-[90%] shadow-xl flex-col p-2 gap-4 cursor-pointer xl:flex-row xl:p-8 xl:justify-center">
        <Link href={`/Details/${item.id}`}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full xl:w-[170px] rounded-lg"
              />
            </div>
        </Link>
        <div className="w-full xl:w-[75%]">
          <Link href={`/Details/${item.id}`}>
              <p className="text-[25px] font-bold">{item.title}</p>
              <div className="flex gap-2">
                <p className="font-light text-[14px]">{item.release_date}</p>
                <p className="font-light text-[14px]">
                  {item.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
              <p className="text-[16px] font-light">{item.tagline}</p>
              <p className="text-[18px]">{item.overview}</p>
          </Link>
          <button
            onClick={handleRemove}
            className="mt-4 flex items-center text-black text-[20px]"
          >
            <FaTrash className="mr-2 ml-1 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
