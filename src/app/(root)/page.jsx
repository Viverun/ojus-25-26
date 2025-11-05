"use client";

import Link from "next/link";

import { Nova_Square } from "next/font/google";

const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});

import React, { useState, useEffect } from "react";
import { FaHome, FaCalendarAlt, FaEnvelope, FaUsers, FaGem } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaYoutube, FaXTwitter, FaFacebook } from "react-icons/fa6";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const OjusCommonPage = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login state once on mount
  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  return (
    <section
      className={`relative overflow-hidden text-white h-screen w-screen flex flex-col justify-center items-center ${nova.className}`}
    >
      {/* Background Video */}
      <video className="absolute inset-0 z-0 w-screen h-screen object-cover" autoPlay loop muted>
        <source
          src="https://res.cloudinary.com/dzcxkso7f/video/upload/f_auto,q_auto:good,vc_auto/ojus-bg-vid_ympxx4.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-10 pointer-events-none"></div>

      {/* PC view Content */}
      <div className="hidden md:flex relative z-20 h-screen w-screen flex-col justify-between items-center">
        {/* NAVBAR */}
        <nav className="w-full flex justify-between items-center px-8 py-2">
          <img src="./logo.jpg" alt="ojus logo" height="100" className="h-12 rounded-full" />

          <div className="flex gap-x-20 text-2xl font-medium justify-center items-center">
            <div className=" gap-0 flex flex-col justify-center items-center">
              <Link href="/sports" className="px-6 py-2 transform hover:-translate-y-1 transition duration-500">
                Sports
              </Link>
              <span className="border w-[70%]"></span>
            </div>

            <div className=" gap-0 flex flex-col justify-center items-center">
              <Link href="/cultural" className="px-6 py-2 transform hover:-translate-y-1 transition duration-500">
                Cultural
              </Link>
              <span className="border w-[70%]"></span>
            </div>
          </div>

          {/* ✅ Conditionally render Sign Up or Logout */}
          {!isLoggedIn ? (
            <button
              onClick={() => (window.location.href = "/signup")}
              className="px-3 py-2 border border-black text-black bg-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-2 border border-black text-black bg-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Logout
            </button>
          )}
        </nav>

        {/* HERO SECTION */}
        <div className="flex-row relative flex justify-center items-center w-full">
          {/* Left Sidebar */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-black/40 p-4 rounded-xl backdrop-blur-md">
            {/* Home */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaHome />
            </button>

            {/* Events Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
                <FaCalendarAlt />
              </button>

              {openDropdown && (
                <div className="absolute left-full top-0 ml-2 bg-black/80 rounded-md p-2 w-40 shadow-lg">
                  <ul className="flex flex-col gap-2">
                    <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Tech</li>
                    <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Cultural</li>
                    <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Gaming</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Contact */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaEnvelope />
            </button>

            {/* About */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaUsers />
            </button>

            {/* Sponsors */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaGem />
            </button>
          </div>

          {/* Center Title */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-extrabold tracking-widest text-purple-300 drop-shadow-lg">OJUS 2025</h1>
            <p className="text-lg mt-3 tracking-wide">Cultural fest of AP Shah College</p>
            <p className="mt-2 font-semibold">Banner drop soon...</p>
          </div>

          {/* Right Social Icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-black/40 p-4 rounded-xl backdrop-blur-md">
            <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaYoutube size={20} />
            </a>
            <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <div className="w-full text-center mb-6">
          <p className="text-xl font-mono tracking-widest">
            Sports events are live &nbsp;&nbsp; | &nbsp;&nbsp; Banner drops in 2 days
          </p>
        </div>
      </div>

      {/* Mobile view Content */}
      <div className="flex md:hidden relative z-20 h-screen w-screen flex-col justify-between items-center">
        {/* NAVBAR */}
        <nav className="w-full flex justify-between items-center px-8 py-2">
          <img src="./logo.jpg" alt="ojus logo" height="100" className="h-12 rounded-full" />

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-3 py-2 border border-black text-black bg-white rounded-lg font-medium transform hover:-translate-y-1 transition duration-400">
                  Check Events
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>
                    <Link className="border-black border-b" href={"/sports"}>
                      Sports
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link className="border-black border-b" href={"/cultural"}>
                      Cultural
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link className="border-black border-b" href={"/cultural"}>
                      Sign Up
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* HERO SECTION */}
        <div className="flex-col gap-y-5 relative flex justify-center items-center w-full">
          {/* Center Title */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-extrabold tracking-widest text-purple-300 drop-shadow-lg">OJUS 2025</h1>
            <p className="text-lg mt-3 tracking-wide">Cultural fest of AP Shah College</p>
            <p className="mt-2 font-semibold">Banner drop soon...</p>
          </div>
          <div className=" flex flex-row justify-center items-center gap-4 bg-black/40 p-4 rounded-xl backdrop-blur-xs">
            <Link href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaYoutube size={20} />
            </Link>
            <Link href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaXTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
              <FaFacebook size={20} />
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <div className="w-full text-center mb-6 text-xl">
          <div className="flex flex-row gap-4 justify-center items-center bg-black/40 p-4 rounded-xl backdrop-blur-md">
            {/* Home */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaHome />
            </button>

            {/* Events Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
                <FaCalendarAlt />
              </button>

              {openDropdown && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/80 rounded-md p-2 w-40 shadow-lg">
                  <ul className="flex flex-col gap-2">
                    <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Tech</li>
                    <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Cultural</li>
                    <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Gaming</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Contact */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaEnvelope />
            </button>

            {/* About */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaUsers />
            </button>

            {/* Sponsors */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
              <FaGem />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OjusCommonPage;

// <div
//   className={`relative min-h-screen bg-purple-800 text-white font-sans bg-cover bg-center `}
//   style={{
//     backgroundImage:
//       "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.instagram.com%2Fpurplefestgoa%2F&psig=AOvVaw0Hzr6MwEN85-vjgn64PW4K&ust=1762092880324000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMD_nNSR0ZADFQAAAAAdAAAAABAE')",
//   }}
// >
//   {/* Top Navbar */}

//   {/* Bottom text */}

// </div>
