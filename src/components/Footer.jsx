import React from "react";
import Link from "next/link";

const footerData = [
  {
    title: "THE BASICS",
    items: [
      "About TMDB",
      "Contact Us",
      "Support Forums",
      "API",
      "System Status",
    ],
  },
  {
    title: "GET INVOLVED",
    items: ["Contribution Bible", "Add New Movie", "Add New TV Show"],
  },
  {
    title: "COMMUNITY",
    items: ["Guidelines", "Discussions", "Leaderboard"],
  },
  {
    title: "LEGAL",
    items: [
      "Terms Of Use",
      "API Terms of Use",
      "Privacy Policy",
      "DMCA Policy",
    ],
  },
];

function Footer() {
  return (
    <div className="bg-[#022540] w-full p-10 gap-10 flex md:flex-row flex-col justify-center items-center">
      <div className="flex flex-col gap-6">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          className="w-[150px]"
          alt="TMDB Logo"
        />
        <div className="py-2 px-5 bg-white w-max rounded-lg text-center text-cyan-400 font-bold">
          <Link href="/Login">Join the Community</Link>
        </div>
      </div>
      <div className="flex flex-row gap-14 flex-wrap xl:gap-10">
        {footerData.map((section, index) => (
          <div key={index} className="text-white">
            <h1 className="font-bold text-xl mb-4">{section.title}</h1>
            {section.items.map((item, idx) => (
              <p key={idx} className="mb-2">
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;