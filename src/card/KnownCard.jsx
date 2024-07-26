import React from "react";

function KnownCard({ name, imageUrl }) {
  return (
    <div className="w-48 flex-shrink-0">
      <img
        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        alt={name}
        className="rounded-xl w-[150px] h-[225px] object-cover mb-2"
      />
      <p className="text-center text-sm font-semibold">{name}</p>
    </div>
  );
}

export default KnownCard;
