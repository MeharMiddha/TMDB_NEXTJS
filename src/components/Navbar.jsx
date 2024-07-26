"use client";
import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import InputTag from "@/components/InputTag";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

function Navbar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const handleToggle = () => {
    setIsSearchActive(!isSearchActive);
  };
  const { data, setData, setWatchlist, setFavourites } = useContext(UserContext);
  const handleLogout = () => {
    setData({ username: "", password: "" });
    setWatchlist([]);
    localStorage.removeItem("watchlist");
    setFavourites([]);
    localStorage.removeItem("favourites");
  };
  
  return (
    <div className="bg-[#022540] h-16 flex justify-around items-center ">
      <div className="flex gap-6 xl:gap-14">
        <Link href="/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt=""
            className="w-40 h-5"
          />
        </Link>
        {data.username === "" && data.password === "" ? (
          <>
            <Link href="/Login" onClick={()=> alert("Login First!")}>
              <p className="text-[#FFF] cursor-pointer xl:block hidden">
                Favourites
              </p>
              <FaHeart className="text-[#FFF] text-[20px] xl:hidden" />
            </Link>
            <Link href="/Login" onClick={()=> alert("Login First!")}>
              <FaBookmark className="text-[#FFF] text-[20px] xl:hidden" />
              <p className="text-[#FFF] cursor-pointer xl:block hidden">
                Watchlist
              </p>
            </Link>
          </>
        ) : (
          <>
            <Link href="/favourite">
              <p className="text-[#FFF] cursor-pointer xl:block hidden">
                Favourites
              </p>
              <FaHeart className="text-[#FFF] text-[20px] xl:hidden" />
            </Link>
            <Link href="/watchlist">
              <FaBookmark className="text-[#FFF] text-[20px] xl:hidden" />
              <p className="text-[#FFF] cursor-pointer xl:block hidden">
                Watchlist
              </p>
            </Link>
          </>
        )}
      </div>
      <div className="flex gap-4 xl:gap-14">
        {!isSearchActive ? (
          <AiOutlineSearch
            className="w-6 text-[#00B5E5] h-6 cursor-pointer"
            onClick={handleToggle}
          />
        ) : (
          <IoMdClose
            className="w-6 text-[#00B5E5] h-6 cursor-pointer"
            onClick={handleToggle}
          />
        )}
        {data.username === "" && data.password === "" ? (
          <Link href="/Login">
            <p className="text-[#FFF] cursor-pointer">Login</p>
          </Link>
        ) : (
          <Link href="/">
            <p className="text-[#FFF] cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </Link>
        )}
      </div>
      <InputTag active={isSearchActive} visibility={setIsSearchActive} />
    </div>
  );
}

export default Navbar;