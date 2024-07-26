import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function Card({ name, date, imageUrl, vote_average }) {
  const getPathColor = (vote) => {
    if (vote < 4.5) return "red";
    if (vote < 7) return "#CFD331";
    return "green";
  };
  return (
    <div className="flex flex-row ">
      <div className="w-[150px]">
        <div className="relative mb-2">
          <img
            className="rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
            alt=""
          />
          <div className="w-14 absolute bottom-[-10px] right-[-16px]">
            <CircularProgressbar
              value={Math.round(vote_average * 10, 1)}
              text={Math.round(vote_average * 10, 1) + "%"}
              styles={buildStyles({
                textColor: "white",
                pathColor: getPathColor(vote_average),
                trailColor: "gray",
                textSize: "20px",
                backgroundColor: "#022540",
                backgroundPadding: 6,
              })}
              background
              className="transition-transform cursor-pointer hover:scale-110 size-10"
            />
          </div>
        </div>

        <p>{name}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default Card;
