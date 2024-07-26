"use client";
import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

function Login() {
  const { data, setData } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", data);
  };
  return (
    <div>
      <div className="w-[90%] p-4 mx-auto xl:h-[68vh]">
        <div>
          <p className="text-[20px] font-bold">Login to your TMDB account</p>
          <p className="font-light">
            In order to use the editing and rating capabilities of TMDB, as well
            as get personal recommendations you will need to login to your
            account. If you do not have an account, registering for an account
            is free and simple.{" "}
            <span className="text-[#43B4E4]">Click here</span> to get started.
          </p>
          <p className="mt-5">
            If you signed up but didn't get your verification email,{" "}
            <span className="text-[#43B4E4]">Click here</span> to have it
            resent.
          </p>
        </div>
        <div className=" mt-10 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Link href="/">
                <button
                  type="submit"
                  className="bg-[#43B4E4] mt-2 w-[100px] text-white font-bold py-2 px-4 rounded-md hover:bg-blue-400"
                >
                  Login
                </button>
              </Link>
              <button
                type="submit"
                className="text-[#43B4E4] mt-2 w-[140px] rounded-md hover:text-blue-400 hover:underline"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
