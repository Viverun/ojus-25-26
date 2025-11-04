"use client";

import Link from "next/link";
import React, { useState } from "react";

const OutdoorPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  // Simplified outdoor events data with only used fields
  const eventsData = {
    1: [
      {
        id: 9,
        name: "Cricket Tournament",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 10,
        name: "Football League",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 11,
        name: "Basketball Showdown",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 12,
        name: "Volleyball Championship",
        banner: "/api/placeholder/400/200",
      },
    ],
    2: [
      {
        id: 13,
        name: "Cricket Finals",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 14,
        name: "Football Knockouts",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 15,
        name: "Athletics Meet",
        banner: "/api/placeholder/400/200",
      },
    ],
    3: [
      {
        id: 16,
        name: "Football Grand Finale",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 17,
        name: "Basketball Finals",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 18,
        name: "Relay Races",
        banner: "/api/placeholder/400/200",
      },
    ],
    4: [
      {
        id: 19,
        name: "All-Star Match",
        banner: "/api/placeholder/400/200",
      },
      {
        id: 20,
        name: "Marathon",
        banner: "/api/placeholder/400/200",
      },
    ],
  };

  const days = [1, 2, 3, 4];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section - Updated to match indoor styling with green/blue theme */}
      <section className="relative py-20 bg-gradient-to-br from-green-600/20 via-black to-blue-600/20 border-b-4 border-green-500">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-500 via-blue-500 to-green-600 bg-clip-text text-transparent tracking-tight">
              OUTDOOR<br />ARENA
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 font-medium">
              EXPERIENCE THE THRILL • PUSH YOUR LIMITS • EMBRACE THE COMPETITION
            </p>
            <Link
              href="/sports"
              className="inline-block group relative bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 border-2 border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
              style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' }}
            >
              <span className="relative z-10">← BACK TO SPORTS</span>
              <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-colors"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Days Navigation - Updated to match indoor styling */}
      <section className="py-12 bg-gradient-to-r from-gray-800 to-gray-900 border-y-2 border-green-500/30">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 border-2 border-green-500/40 p-2">
            <div className="grid grid-cols-4 gap-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative py-5 font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 ${
                    selectedDay === day
                      ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/50"
                      : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-green-400"
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

      {/* Events Grid - Updated to match indoor minimal styling */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-wide">
            EVENTS - <span className="text-green-500">DAY {selectedDay}</span>
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
                {/* Gradient Border/Glow - Green/Blue theme */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-md group-hover:blur-lg -z-10"
                  style={{ 
                    clipPath: 'inherit'
                  }}
                ></div>

                {/* Inner Card Content */}
                <div 
                  className="relative bg-gray-900/80 backdrop-blur-sm p-6 h-full flex flex-col"
                  style={{ 
                    clipPath: 'inherit'
                  }}
                >
                  {/* Event Banner with same shape as card */}
                  <div 
                    className="w-full h-40 mb-6 mx-auto overflow-hidden"
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
                  <h3 className="text-2xl font-black uppercase tracking-wide mb-6 text-white group-hover:text-green-400 transition-colors flex-grow">
                    {event.name}
                  </h3>

                  {/* View Details Button */}
                  <div className="mt-auto">
                    <Link
                      href={`/sports/events/${event.id}`}
                      className="inline-block group/button relative bg-green-600 hover:bg-green-700 text-white font-black py-3 px-6 border-2 border-white/20 hover:border-white transition-all duration-300 transform hover:scale-105 uppercase tracking-wider w-full"
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

          {/* No Events Message - Updated styling */}
          {(!eventsData[selectedDay] || eventsData[selectedDay].length === 0) && (
            <div 
              className="text-center py-20 border-2 border-green-500/30 bg-gray-800/50 mx-auto max-w-2xl relative"
              style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-50"></div>
              <div className="relative z-10">
                <div className="text-2xl text-gray-400 font-bold mb-4">NO EVENTS SCHEDULED</div>
                <div className="text-gray-500 text-lg">STAY TUNED FOR UPDATES!</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Updated styling */}
      <footer className="bg-gradient-to-r from-gray-900 to-black border-t-4 border-green-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <div 
            className="border-2 border-green-500/30 p-8 bg-gray-800/30 relative"
            style={{ clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0 100%)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5"></div>
            <p className="text-xl text-gray-300 font-bold uppercase tracking-wide relative z-10">
              FEEL THE ADRENALINE RUSH! CHOOSE YOUR SPORT AND SHOWCASE YOUR TALENT IN THE GREAT OUTDOORS! ⚽🏏🏀
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default OutdoorPage;