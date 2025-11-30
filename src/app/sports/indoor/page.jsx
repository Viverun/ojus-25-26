"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const IndoorPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const { user, isAuthenticated, loading } = useAuth();

  // The clip-path for the main event box
  const boxClipPath =
    "polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)";

  // Events data with proper image placeholders
  //   const eventsData = {
  //     // Day 1 (Original Dec 26): Badminton Singles and Chess
  //     1: [
  //       {
  //         id: 1,
  //         name: "Badminton Singles (M/F)",
  //         banner: "/api/placeholder/400/200",
  //       },
  //       {
  //         id: 2,
  //         name: "Chess (Boys & Girls)",
  //         banner: "/api/placeholder/400/200",
  //       },
  //     ],

  //     // Day 2 (Original Dec 27): Badminton Doubles, Carrom, and Table Tennis
  //     2: [
  //       {
  //         id: 3,
  //         name: "Badminton Doubles",
  //         banner: "/api/placeholder/400/200",
  //       },
  //       {
  //         id: 4,
  //         name: "Carrom",
  //         banner: "/api/placeholder/400/200",
  //       },
  //       {
  //         id: 5,
  //         name: "Table Tennis",
  //         banner: "/api/placeholder/400/200",
  //       },
  //     ],
  // };

  const eventsData = {
    // Day 1 (Original Dec 26): Badminton Singles and Chess
    1: [
      {
        id: 1,
        name: "Badminton Singles (M/F)",
        banner: "https://4kwallpapers.com/images/walls/thumbs/17420.jpg",
      },
      {
        id: 2,
        name: "Chess (Boys & Girls)",
        banner: "https://4kwallpapers.com/images/walls/thumbs/16674.jpg",
      },
    ], // Day 2 (Original Dec 27): Badminton Doubles, Carrom, and Table Tennis
    2: [
      {
        id: 3,
        name: "Badminton Doubles",
        banner: "https://4kwallpapers.com/images/walls/thumbs/17420.jpg", // Reusing Badminton
      },
      {
        id: 4,
        name: "Carrom",
        banner: "https://www.parascarrom.com/images/banner3.png",
      },
      {
        id: 5,
        name: "Table Tennis",
        banner:
          "https://www.shutterstock.com/image-photo/hand-ping-pong-racket-hitting-260nw-1963053211.jpg",
      },
    ],
  };

  const days = [1, 2];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Hero Section - Enhanced hover effects */}
      <section className="relative py-20 bg-gradient-to-br from-red-600/20 via-black to-orange-600/20 border-b-4 border-red-500 group/hero">
        <div className="absolute inset-0 bg-black/40 group-hover/hero:bg-black/30 transition-all duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent tracking-tight group-hover/hero:from-red-400 group-hover/hero:via-orange-400 group-hover/hero:to-red-500 transition-all duration-500">
              INDOOR ARENA
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 font-medium px-4 group-hover/hero:text-gray-200 transition-colors duration-300">
              MASTER YOUR SKILLS • DOMINATE THE COMPETITION • CLAIM VICTORY
            </p>
            <Link
              href="/sports"
              className="inline-block group/back relative bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 border-2 border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/40 transform hover:-translate-y-1"
              style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
            >
              <span className="relative z-10 group-hover/back:translate-x-1 transition-transform duration-300">
                ← BACK TO SPORTS
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 group-hover/back:from-red-500/20 group-hover/back:to-orange-500/20 transition-all duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur opacity-0 group-hover/back:opacity-100 transition-opacity duration-500 -z-10"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Days Navigation - Enhanced hover effects */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-gray-800 to-gray-900 border-y-2 border-red-500/30 group/days">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 border-2 border-red-500/40 p-2 rounded-lg group-hover/days:border-red-500/60 transition-colors duration-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative py-3 md:py-4 font-bold text-sm md:text-lg transition-all duration-500 transform border-2 group/day overflow-hidden ${
                    selectedDay === day
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-red-500 shadow-2xl shadow-red-500/60 scale-105"
                      : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-red-400 hover:scale-105"
                  }`}
                  style={{
                    clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <span
                    className={`relative z-10 transition-all duration-300 ${
                      selectedDay === day
                        ? "group-hover/day:scale-110"
                        : "group-hover/day:translate-x-1"
                    }`}
                  >
                    DAY {day}
                  </span>
                  {/* Animated background for selected day */}
                  {selectedDay === day && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover/day:opacity-100 transition-opacity duration-500"></div>
                  )}
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/day:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid - Enhanced hover effects */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-16 uppercase tracking-wide group/title">
            EVENTS -{" "}
            <span className="text-red-500 group-hover/title:bg-gradient-to-r group-hover/title:from-red-400 group-hover/title:to-orange-400 group-hover/title:bg-clip-text group-hover/title:text-transparent transition-all duration-500">
              DAY {selectedDay}
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {eventsData[selectedDay]?.map((event) => (
              <div
                key={event.id}
                className="relative group w-full mx-auto transform hover:-translate-y-2 transition-transform duration-500"
                style={{
                  clipPath: boxClipPath,
                }}
              >
                {/* Enhanced Gradient Border/Glow */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-red-600 opacity-70 group-hover:opacity-100 transition-all duration-500 blur-md group-hover:blur-xl -z-10 group-hover:from-red-500 group-hover:via-orange-400 group-hover:to-red-500"
                  style={{
                    clipPath: boxClipPath,
                  }}
                ></div>

                {/* Animated border pulse */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-5"
                  style={{ clipPath: boxClipPath }}
                ></div>

                {/* Inner Card Content */}
                <div
                  className="relative bg-gray-900/95 backdrop-blur-md p-4 md:p-6 h-full flex flex-col border border-gray-700/50 group-hover:border-red-500/30 transition-all duration-500"
                  style={{
                    clipPath: boxClipPath,
                  }}
                >
                  {/* Event Banner with enhanced hover */}
                  <div
                    className="w-full h-32 md:h-40 bg-gray-700 mb-4 md:mb-6 mx-auto overflow-hidden relative group/banner"
                    style={{
                      clipPath: boxClipPath,
                    }}
                  >
                    <img
                      src={event.banner}
                      alt={event.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover/banner:scale-110 group-hover/banner:rotate-1"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x200/1f2937/ffffff?text=${encodeURIComponent(
                          event.name
                        )}`;
                      }}
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/banner:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Event Name with enhanced hover */}
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-4 md:mb-6 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-500 flex-grow line-clamp-2 transform group-hover:translate-x-2">
                    {event.name}
                  </h3>

                  {/* Enhanced View Details Button */}
                  <div className="mt-auto">
                    <Link
                      href={`/sports/events/${event.id}`}
                      className="inline-block group/button relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-orange-500 text-white font-bold py-2 md:py-3 px-4 md:px-6 border-2 border-white/20 hover:border-white transition-all duration-500 transform hover:scale-105 uppercase tracking-wider w-full text-sm md:text-base overflow-hidden"
                      style={{
                        clipPath: boxClipPath,
                      }}
                    >
                      {/* Main button text */}
                      <span className="relative z-10 group-hover/button:translate-x-1 transition-transform duration-300">
                        VIEW DETAILS →
                      </span>

                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"></div>

                      {/* Shine animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>

                      {/* Border glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur opacity-0 group-hover/button:opacity-100 transition-opacity duration-500 -z-10"></div>

                      {/* Pulse animation on hover */}
                      <div className="absolute inset-0 bg-white/10 scale-0 group-hover/button:scale-100 opacity-0 group-hover/button:opacity-100 transition-all duration-500 rounded-lg"></div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Events Message with enhanced hover */}
          {(!eventsData[selectedDay] ||
            eventsData[selectedDay].length === 0) && (
            <div
              className="text-center py-12 md:py-20 border-2 border-red-500/30 bg-gray-800/50 mx-auto max-w-2xl relative group/no-events transform hover:scale-105 transition-transform duration-500"
              style={{ clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-50 group-hover/no-events:opacity-75 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-xl md:text-2xl text-gray-400 font-bold mb-4 group-hover/no-events:text-gray-300 transition-colors duration-300">
                  NO EVENTS SCHEDULED
                </div>
                <div className="text-gray-500 text-base md:text-lg group-hover/no-events:text-gray-400 transition-colors duration-300">
                  STAY TUNED FOR UPDATES!
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer with enhanced hover */}
      <footer className="bg-gradient-to-r from-gray-900 to-black border-t-4 border-red-500 py-8 md:py-12 group/footer">
        <div className="container mx-auto px-4 text-center">
          <div
            className="border-2 border-red-500/30 p-6 md:p-8 bg-gray-800/30 relative group-hover/footer:border-red-500/50 transition-all duration-500 transform group-hover/footer:scale-105"
            style={{ clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0 100%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 group-hover/footer:from-red-500/10 group-hover/footer:to-orange-500/10 transition-all duration-500"></div>
            <p className="text-lg md:text-xl text-gray-300 font-bold uppercase tracking-wide relative z-10 px-2 group-hover/footer:text-white transition-colors duration-300">
              READY TO COMPETE? CHOOSE YOUR ARENA AND SHOW THEM WHAT YOU'RE MADE
              OF! 🏆
            </p>
            {/* Animated emoji */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl group-hover/footer:scale-125 group-hover/footer:rotate-12 transition-transform duration-500">
              🏆
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default IndoorPage;
