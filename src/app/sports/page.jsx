"use client";

import CountdownTimer from "@/myComponents/CountdownTimer";
import Link from "next/link";
import React from "react";
import TiltCard from "@/components/TiltCard";
import ParticleBackground from "@/components/ui/ParticleBackground"; // 1. Import background
import CometCursor from "@/components/ui/CometCursor"; // 2. Import comet cursor
import { motion } from "framer-motion";

import { FaXTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa6";

const SportsPage = () => {
  const socials = [
    {
      name: "x",
      link: "https://twitter.com/",
      icon: <FaXTwitter className="size-6 text-white hover:scale-110 transition-transform duration-200" />,
    },
    {
      name: "instagram",
      link: "https://instagram.com/",
      icon: <FaInstagram className="size-6 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />,
    },
    {
      name: "facebook",
      link: "https://facebook.com/",
      icon: <FaFacebook className="size-6 hover:text-blue-500 hover:scale-110 transition-transform duration-200" />,
    },
    {
      name: "youtube",
      link: "https://youtube.com/",
      icon: <FaYoutube className="size-6 hover:text-red-500 hover:scale-110 transition-transform duration-200" />,
    },
  ];

  const arenas = [
    {
      name: "Indoor",
      activities: ["Gaming", "Badminton", "Table Tennis", "Chess"],
      link: "/indoor",
    },
    {
      name: "Outdoor",
      activities: ["Cricket", "Football", "Basketball"],
      link: "/outdoor",
    },
  ];

  return (
    <>
      {/* --- Page Content (z-10) --- */}
      <main className="relative z-10">
        {/* --- Countdown Section --- */}
        <section className="h-screen w-screen flex flex-col justify-center items-center relative">
          <img
            src="https://as2.ftcdn.net/v2/jpg/04/61/87/15/1000_F_461871566_HjDzxGg7labHajuQD3yPvxRx0Jfh8zFP.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/45 z-0"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center w-full z-10"
          >
            <h1 className="text-3xl mb-4 text-center underline">Banner Drops in</h1>
            <CountdownTimer targetDate="2025-12-02T00:00:00" />
            <div className="bottom-0 flex flex-row gap-x-5 mt-10">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${`hover:text-${social.color}-400`} transition-colors`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </motion.div>
        </section>

        {/* --- Arena Section --- */}
        {/* --- Arena Section --- */}
        <section
          className="min-h-screen w-full flex flex-col justify-center items-center
    bg-[#070B18] relative overflow-hidden px-6 py-24"
          style={{ perspective: "1800px" }}
        >
          {/* Background gradient & glow blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/30" />

          <div
            className="absolute top-1/3 left-1/4 w-[600px] h-[600px]
      bg-fuchsia-600/20 blur-[180px] rounded-full"
          />

          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px]
      bg-blue-600/20 blur-[180px] rounded-full"
          />

          {/* Particles (behind cards) */}
          <ParticleBackground className="absolute inset-0 opacity-20" />

          {/* Vignette for cinematic depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.7))]" />

          {/* 3D Grid floor */}
          <div
            className="absolute bottom-0 left-0 w-full h-[45vh] opacity-25
      bg-[url('/grid.svg')] bg-bottom bg-cover mix-blend-screen pointer-events-none"
          />

          {/* Radial glow on floor */}
          <div
            className="absolute bottom-0 w-full h-[40vh]
      bg-[radial-gradient(circle_at_bottom,rgba(255,0,255,0.12),transparent)]
      pointer-events-none"
          />

          {/* Section Label */}
          <span className="text-fuchsia-400/70 tracking-widest uppercase text-sm mb-3 z-10">Select Mode</span>

          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl text-nowrap font-extrabold text-transparent
      bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400 drop-shadow-lg mb-4 z-10"
          >
            Choose Your Arena
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-300 text-center max-w-xl mb-20 z-10"
          >
            Select your battlefield and dominate with style.
          </motion.p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-5xl z-10">
            {arenas.map((arena, index) => (
              <motion.div
                key={arena.name}
                whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="relative group"
              >
                {/* Neon Glow Outline */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br
            from-fuchsia-600 to-blue-600 opacity-40 blur-[35px]
            group-hover:opacity-70 transition-all duration-500"
                />

                {/* Actual Card */}
                <div
                  className="relative z-10 p-8 rounded-3xl bg-[#0F1526]/80 backdrop-blur-xl
            border border-white/10 shadow-[0_0_25px_rgba(255,0,255,0.3)]
            group-hover:shadow-[0_0_35px_rgba(255,0,255,0.5)]
            transition-all duration-300 flex flex-col"
                >
                  <h2 className="text-3xl font-bold text-white mb-4">{arena.name}</h2>

                  <p className="text-gray-300 mb-6">{arena.activities.join(" · ")}</p>

                  <span
                    className="text-fuchsia-300 font-medium tracking-wide
              group-hover:text-fuchsia-200 transition-colors
              underline underline-offset-4 decoration-fuchsia-500/50"
                  >
                    Enter →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section Footer */}
          <div className="mt-20 text-gray-500 text-xs tracking-wider z-10">2 Arenas Available — More Coming Soon</div>
        </section>
      </main>
    </>
  );
};

export default SportsPage;
