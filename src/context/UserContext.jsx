"use client";
import React, { useState, createContext, useEffect } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });
  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  const addToFavourites = (item) => {
    setFavourites([...favourites, item]);
    
  };
  const removeFromFavourites = (item) => {
    setFavourites(favourites.filter((i) => i.id !== item.id));
  };
  const addToWatchlist = (item) => {
    setWatchlist([...watchlist, item]);
  };
  const removeFromWatchlist = (item) => {
    setWatchlist(watchlist.filter((i) => i.id !== item.id));
  };
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : { username: "", password: "" };
  });
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data));
  }, [data]);
  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        watchlist,
        setWatchlist,
        favourites,
        setFavourites,
        addToWatchlist,
        addToFavourites,
        removeFromFavourites,
        removeFromWatchlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, ContextProvider };
