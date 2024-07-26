"use client";
import React, { useState, createContext, useEffect } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [data, setData] = useState({ username: "", password: "" });

  // Initialize favourites and watchlist from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavourites = localStorage.getItem("favourites");
      const storedWatchlist = localStorage.getItem("watchlist");
      const storedData = localStorage.getItem("userData");

      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  // Update localStorage when favourites or watchlist change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }, [favourites]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(data));
    }
  }, [data]);

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
