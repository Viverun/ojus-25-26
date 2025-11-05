

"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

// --- Combined Schedule Data ---
const combinedScheduleData = [
  {
    day: "Day 1",
    date: "March 15, 2024",
    theme: "Mind Games & Team Sports Kickoff",
    events: [
      { name: "Chess Championship", time: "9:00 AM - 1:00 PM", type: "indoor" },
      { name: "Carrom Tournament", time: "2:00 PM - 5:00 PM", type: "indoor" },
      { name: "Table Tennis", time: "6:00 PM - 9:00 PM", type: "indoor" },
      {
        name: "Cricket Qualifiers",
        time: "8:00 AM - 5:00 PM",
        type: "outdoor",
      },
      {
        name: "Volleyball Tournament",
        time: "9:00 AM - 4:00 PM",
        type: "outdoor",
      },
    ],
  },
  {
    day: "Day 2",
    date: "March 16, 2024",
    theme: "Racquet Sports & Field Extravaganza",
    events: [
      { name: "Badminton Singles", time: "8:00 AM - 12:00 PM", type: "indoor" },
      { name: "Futsal Qualifiers", time: "1:00 PM - 6:00 PM", type: "indoor" },
      {
        name: "Snooker Competition",
        time: "7:00 PM - 10:00 PM",
        type: "indoor",
      },
      {
        name: "Football Qualifiers",
        time: "8:00 AM - 6:00 PM",
        type: "outdoor",
      },
      {
        name: "Basketball Championship",
        time: "9:00 AM - 5:00 PM",
        type: "outdoor",
      },
    ],
  },
  {
    day: "Day 3",
    date: "March 17, 2024",
    theme: "Finals & Traditional Sports",
    events: [
      { name: "Badminton Finals", time: "9:00 AM - 12:00 PM", type: "indoor" },
      { name: "Futsal Finals", time: "2:00 PM - 5:00 PM", type: "indoor" },
      { name: "BGMI Tournament", time: "6:00 PM - 11:00 PM", type: "indoor" },
      { name: "Cricket Finals", time: "9:00 AM - 6:00 PM", type: "outdoor" },
      {
        name: "Kabaddi Competition",
        time: "10:00 AM - 4:00 PM",
        type: "outdoor",
      },
    ],
  },
  {
    day: "Day 4",
    date: "March 18, 2024",
    theme: "Digital Arts & Athletics",
    events: [
      {
        name: "Valorant Championship",
        time: "10:00 AM - 4:00 PM",
        type: "indoor",
      },
      {
        name: "Sketching Competition",
        time: "11:00 AM - 2:00 PM",
        type: "indoor",
      },
      { name: "Debate Competition", time: "3:00 PM - 6:00 PM", type: "indoor" },
      { name: "Football Finals", time: "3:00 PM - 6:00 PM", type: "outdoor" },
      { name: "Athletics Meet", time: "8:00 AM - 1:00 PM", type: "outdoor" },
    ],
  },
  {
    day: "Day 5",
    date: "March 19, 2024",
    theme: "Celebration & Community Sports",
    events: [
      { name: "Awards Ceremony", time: "4:00 PM - 6:00 PM", type: "indoor" },
      { name: "Guest Panel & Talk", time: "6:30 PM - 8:00 PM", type: "indoor" },
      { name: "Gully Cricket", time: "10:00 AM - 2:00 PM", type: "outdoor" },
      { name: "Marathon", time: "6:00 AM - 9:00 AM", type: "outdoor" },
    ],
  },
];

// Helper function to get just the date number
const getDateNumber = (dateString) => {
  try {
    return dateString.split(" ")[1].replace(",", "");
  } catch (e) {
    return "?";
  }
};

function Schedule() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#5C2671", color: "#F5F5F5" }}
    >
      {/* === HEADER ===
      <header
        className="flex justify-between items-center w-full p-5 md:px-10 border-b"
        style={{ backgroundColor: "#5A1A8A", borderColor: "#E0E0E0" }}
      >
        <Link href="/" className="flex items-center">
          <div
            className="flex items-center justify-center w-16 h-16 border-2 rounded-full font-bold text-xl"
            style={{
              backgroundColor: "#480A67",
              borderColor: "#D8F904",
              color: "#D8F904",
            }}
          >
            Ojus
          </div>
        </Link>
        <nav>
          <ul className="flex list-none gap-4">
            <li>
              <Link
                href="/about"
                className="font-medium py-2.5 px-5 rounded-full border transition-all duration-300"
                style={{
                  borderColor: "#E0E0E0",
                  color: "#F5F5F5",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#480A67";
                  e.target.style.borderColor = "#D8F904";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.borderColor = "#E0E0E0";
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/schedule"
                className="font-medium py-2.5 px-5 rounded-full border transition-all duration-300"
                style={{
                  backgroundColor: "#D8F904",
                  borderColor: "#D8F904",
                  color: "#480A67",
                }}
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="font-medium py-2.5 px-5 rounded-full border transition-all duration-300"
                style={{
                  borderColor: "#E0E0E0",
                  color: "#F5F5F5",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#480A67";
                  e.target.style.borderColor = "#D8F904";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.borderColor = "#E0E0E0";
                }}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header> */}

      {/* === MAIN CONTENT === */}
      <main className="w-full">
        {/* Page Header with Background */}
        <div
          className=" relative min-h-[300px] flex items-centre justify-center"
          style={{
            backgroundColor: "#5C2671",
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/SCG.jpg"
              alt="Sports background"
              fill
              className="scale-125"
              priority
              sizes="100vw"
              style={{ 
                objectFit: 'contain',
                transform: 'scale(0.8)',
                transformOrigin: 'center center'
              }}
            />
          </div>
        </div>

        {/* Schedule Container */}
        <div
          className="w-full py-5"
          style={{
            backgroundColor: "#5C2671",
          }}
        >
          <div className="w-full px-2">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
              {combinedScheduleData.map((day) => (
                <div
                  key={day.day}
                  className="flex flex-col rounded-lg shadow-2xl overflow-hidden min-h-[550px] transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  style={{
                    backgroundColor: "#5A1A8A",
                    border: "2px solid #E0E0E0",
                  }}
                >
                  {/* Day/Date Header */}
                  <div
                    className="flex flex-col items-center justify-center text-center p-6"
                    style={{
                      backgroundColor: "#D8F904",
                      color: "#480A67",
                    }}
                  >
                    <span className="text-6xl font-bold">
                      {getDateNumber(day.date)}
                    </span>
                    <h3 className="text-2xl font-bold">{day.day}</h3>
                    <p className="text-sm font-semibold opacity-90">
                      {day.date.split(",")[0]}
                    </p>
                  </div>

                  {/* Events List for that day */}
                  <div className="p-5 space-y-3 h-full flex flex-col">
                    <div className="space-y-3 flex-1">
                      {day.events.map((event) => (
                        <div
                          key={event.name}
                          className="p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
                          style={{
                            backgroundColor: "#480A67",
                            borderLeft: `4px solid ${
                              event.type === "indoor" ? "#D8F904" : "#E0E0E0"
                            }`,
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4
                                className="font-bold text-sm mb-1"
                                style={{ color: "#F5F5F5" }}
                              >
                                {event.name}
                              </h4>
                              <p
                                className="text-xs font-medium"
                                style={{ color: "#D8F904" }}
                              >
                                {event.time}
                              </p>
                            </div>
                            <span
                              className="text-xs font-bold px-2 py-1 rounded-full ml-2 shrink-0"
                              style={{
                                backgroundColor:
                                  event.type === "indoor"
                                    ? "#D8F904"
                                    : "#E0E0E0",
                                color: "#480A67",
                              }}
                            >
                              {event.type === "indoor" ? "🏠" : "🌳"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Theme at the bottom */}
                    <div
                      className="text-center pt-4 mt-4 border-t"
                      style={{ borderColor: "#D8F904" }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "#D8F904" }}
                      >
                        {day.theme}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Schedule;
