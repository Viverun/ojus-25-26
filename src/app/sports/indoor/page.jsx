"use client";

import Link from "next/link";
import React, { useState } from "react";

const IndoorPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  // Simplified events data with only used fields
  const eventsData = {
    1: [
      {
        id: 1,
        name: "Valorant Tournament",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 2,
        name: "Badminton Singles",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 3,
        name: "Table Tennis Championship",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 4,
        name: "Chess Masters",
        banner: "/api/placeholder/400/200",
      },
    ],
    2: [
      {
        id: 5,
        name: "CS:GO Showdown",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 6,
        name: "Badminton Doubles",
        banner: "/api/placeholder/400/200",
      },
    ],
    3: [
      {
        id: 7,
        name: "FIFA 24 Championship",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 8,
        name: "Table Tennis Doubles",
        banner: "/api/placeholder/400/200",
      },
    ],
  };

  const days = [1, 2, 3, 4];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-600/20 via-black to-orange-600/20 border-b-4 border-red-500">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent tracking-tight">
              INDOOR<br />ARENA
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 font-medium">
              MASTER YOUR SKILLS • DOMINATE THE COMPETITION • CLAIM VICTORY
            </p>
            <Link
              href="/sports"
              className="inline-block group relative bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 border-2 border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' }}
            >
              <span className="relative z-10">← BACK TO SPORTS</span>
              <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Days Navigation */}
      <section className="py-12 bg-gradient-to-r from-gray-800 to-gray-900 border-y-2 border-red-500/30">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 border-2 border-red-500/40 p-2">
            <div className="grid grid-cols-4 gap-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative py-5 font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 ${
                    selectedDay === day
                      ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/50"
                      : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-red-400"
                  }`}
                  style={{ 
                    clipPath: `polygon(10% 0, 90% 0, 100% 100%, 0 100%)`,
                    transform: selectedDay === day ? 'skewX(-5deg)' : 'none'
                  }}
                >
                  <span style={{ transform: selectedDay === day ? 'skewX(5deg)' : 'none' }}>
                    DAY {day}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-wide">
            EVENTS - <span className="text-red-500">DAY {selectedDay}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {eventsData[selectedDay]?.map((event) => (
              <div
                key={event.id}
                className="relative p-px text-center text-white transition-all duration-300 group w-full max-w-sm mx-auto"
                style={{ 
                  clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)' 
                }}
              >
                {/* Gradient Border/Glow */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-md group-hover:blur-lg -z-10"
                  style={{ 
                    clipPath: 'inherit'
                  }}
                ></div>

                {/* Inner Card Content - Made more slender */}
                <div 
                  className="relative bg-gray-900/80 backdrop-blur-sm p-6 h-full flex flex-col"
                  style={{ 
                    clipPath: 'inherit'
                  }}
                >
                  {/* Event Banner with same shape as card */}
                  <div 
                    className="w-full h-40 bg-amber-50 mb-6 mx-auto overflow-hidden"
                    style={{ 
                      clipPath: 'inherit'
                    }}
                  >
                    <img
                      src={event.banner}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Event Name */}
                  <h3 className="text-2xl font-black uppercase tracking-wide mb-6 text-white group-hover:text-red-400 transition-colors flex-grow">
                    {event.name}
                  </h3>

                  {/* View Details Button */}
                  <div className="mt-auto">
                    <Link
                      href={`/sports/events/${event.id}`}
                      className="inline-block group/button relative bg-red-600 hover:bg-red-700 text-white font-black py-3 px-6 border-2 border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105 uppercase tracking-wider w-full"
                      style={{ 
                        clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' 
                      }}
                    >
                      <span className="relative z-10">VIEW DETAILS →</span>
                      <div 
                        className="absolute inset-0 bg-white/10 group-hover/button:bg-white/20 transition-colors"
                        style={{ clipPath: 'inherit' }}
                      ></div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Events Message */}
          {(!eventsData[selectedDay] || eventsData[selectedDay].length === 0) && (
            <div 
              className="text-center py-20 border-2 border-red-500/30 bg-gray-800/50 mx-auto max-w-2xl relative"
              style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-50"></div>
              <div className="relative z-10">
                <div className="text-2xl text-gray-400 font-bold mb-4">NO EVENTS SCHEDULED</div>
                <div className="text-gray-500 text-lg">STAY TUNED FOR UPDATES!</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black border-t-4 border-red-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <div 
            className="border-2 border-red-500/30 p-8 bg-gray-800/30 relative"
            style={{ clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0 100%)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
            <p className="text-xl text-gray-300 font-bold uppercase tracking-wide relative z-10">
              READY TO COMPETE? CHOOSE YOUR ARENA AND SHOW THEM WHAT YOU'RE MADE OF! 🏆
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default IndoorPage;