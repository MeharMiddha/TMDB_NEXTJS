"use client";
import React, { useState, createContext, useEffect } from "react";
const UserContext = createContext();
function getFromLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
}
function setInLocalStorage(key, value) {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, value);
  }
}
const ContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = getFromLocalStorage("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });
  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = getFromLocalStorage("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });
  useEffect(() => {
    setInLocalStorage("favourites", JSON.stringify(favourites));
  }, [favourites]);
  useEffect(() => {
    setInLocalStorage("watchlist", JSON.stringify(watchlist));
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
    const storedData = getFromLocalStorage("userData");
    return storedData ? JSON.parse(storedData) : { username: "", password: "" };
  });
  useEffect(() => {
    setInLocalStorage("userData", JSON.stringify(data));
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