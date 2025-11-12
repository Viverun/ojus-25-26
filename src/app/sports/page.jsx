// import CountdownTimer from "@/myComponents/CountdownTimer";
// import Link from "next/link";
// import React from "react";

// import {
//   FaXTwitter,
//   FaInstagram,
//   FaFacebook,
//   FaYoutube,
// } from "react-icons/fa6";
// const SportsPage = () => {
//   const socials = [
//     {
//       name: "x",
//       link: "https://twitter.com/",
//       icon: (
//         <FaXTwitter className="size-6 text-white hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "instagram",
//       link: "https://instagram.com/",
//       icon: (
//         <FaInstagram className="size-6 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "facebook",
//       link: "https://facebook.com/",
//       icon: (
//         <FaFacebook className="size-6 hover:text-blue-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "youtube",
//       link: "https://youtube.com/",
//       icon: (
//         <FaYoutube className="size-6 hover:text-red-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//   ];

//   const arenas = [
//     {
//       name: "Indoor",
//       activities: ["Gaming", "Badminton", "Table Tennis", "Chess"],
//       link: "/indoor",
//     },
//     {
//       name: "Outdoor",
//       activities: ["Cricket", "Football", "Basketball"],
//       link: "/outdoor",
//     },
//   ];

//   return (
//     <main className="absolute z-10">
//       <section className="h-screen w-screen flex flex-col justify-center items-center">
//         <div className="flex flex-col justify-center items-center w-full">
//           <h1 className="text-3xl mb-4 text-center underline">
//             Banner Drops in
//           </h1>
//           <CountdownTimer targetDate="2025-11-03T00:00:00" />
//         </div>
//         <div className="bottom-0 flex flex-row gap-x-5 mt-10">
//           {socials.map((social, index) => (
//             <Link
//               key={social.name}
//               href={social.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`${`hover:text-${social.color}-400`} transition-colors`}
//             >
//               {social.icon}
//             </Link>
//           ))}
//         </div>
//       </section>
//       <section className="h-screen w-screen flex flex-col justify-center items-center">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center">
//           Choose Your Arena
//         </h1>
//         <p className="text-gray-300 mb-12 text-center">
//           Select your battlefield and dominate!
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
//           {arenas.map((arena) => (
//             <div
//               key={arena.name}
//               className="border border-gray-700 rounded-xl p-8 flex flex-col justify-between hover:bg-gray-800 transition-colors cursor-pointer"
//             >
//               <h2 className="text-3xl font-semibold mb-4">{arena.name}</h2>
//               <p className="text-gray-300 mb-6">
//                 {arena.activities.join(" · ")}
//               </p>
//               <a
//                 href={`/sports${arena.link}`} 
//                 className="self-start text-white font-medium underline hover:text-gray-400"
//               >
//                 Enter →
//               </a>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default SportsPage;


// import CountdownTimer from "@/myComponents/CountdownTimer";
// import Link from "next/link";
// import React from "react";
// import TiltCard from "@/components/TiltCard"; // Import your new component

// import {
//   FaXTwitter,
//   FaInstagram,
//   FaFacebook,
//   FaYoutube,
// } from "react-icons/fa6";

// const SportsPage = () => {
//   const socials = [
//     {
//       name: "x",
//       link: "https://twitter.com/",
//       icon: (
//         <FaXTwitter className="size-6 text-white hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "instagram",
//       link: "https://instagram.com/",
//       icon: (
//         <FaInstagram className="size-6 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "facebook",
//       link: "https://facebook.com/",
//       icon: (
//         <FaFacebook className="size-6 hover:text-blue-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "youtube",
//       link: "https://youtube.com/",
//       icon: (
//         <FaYoutube className="size-6 hover:text-red-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//   ];

//   const arenas = [
//     {
//       name: "Indoor",
//       activities: ["Gaming", "Badminton", "Table Tennis", "Chess"],
//       link: "/indoor",
//       // Optional: You can add background images here
//       // bgImage: "url(https://images.unsplash.com/photo-1557672199-6e8c8b2b8fff?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80)"
//     },
//     {
//       name: "Outdoor",
//       activities: ["Cricket", "Football", "Basketball"],
//       link: "/outdoor",
//       // bgImage: "url(https://images.unsplash.com/photo-1519861531473-92002a281d56?auto=format&fit=crop&w=934&q=80)"
//     },
//   ];

//   return (
//     <main className="absolute z-10">
//       <section className="h-screen w-screen flex flex-col justify-center items-center">
//         <div className="flex flex-col justify-center items-center w-full">
//           <h1 className="text-3xl mb-4 text-center underline">
//             Banner Drops in
//           </h1>
//           <CountdownTimer targetDate="2025-11-03T00:00:00" />
//         </div>
//         <div className="bottom-0 flex flex-row gap-x-5 mt-10">
//           {socials.map((social, index) => (
//             <Link
//               key={social.name}
//               href={social.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`${`hover:text-${social.color}-400`} transition-colors`}
//             >
//               {social.icon}
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Add perspective style to the section */}
//       <section 
//         className="h-screen w-screen flex flex-col justify-center items-center"
//         style={{ perspective: "1500px" }}
//       >
//         <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center">
//           Choose Your Arena
//         </h1>
//         <p className="text-gray-300 mb-12 text-center">
//           Select your battlefield and dominate!
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
//           {arenas.map((arena) => (
//             // Wrap the entire card in a <Link>
//             <Link
//               key={arena.name}
//               href={`/sports${arena.link}`}
//               className="w-full h-full" // Make link fill the grid cell
//             >
//               {/* Use your new TiltCard component */}
//               <TiltCard
//                 className="border border-gray-700 rounded-xl p-8 flex flex-col justify-between cursor-pointer w-full h-full"
//                 // Optional: You can uncomment this to add the background image
//                 // style={{ backgroundImage: arena.bgImage, backgroundSize: "cover" }}
//               >
//                 {/* Your original card content */}
//                 <h2 className="text-3xl font-semibold mb-4">{arena.name}</h2>
//                 <p className="text-gray-300 mb-6">
//                   {arena.activities.join(" · ")}
//                 </p>
                
//                 {/* Replaced <a> tag with a styled <span> */}
//                 <span
//                   className="self-start text-white font-medium underline hover:text-gray-400 transition-colors"
//                 >
//                   Enter →
//                 </span>
//               </TiltCard>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default SportsPage;






// import CountdownTimer from "@/myComponents/CountdownTimer";
// import Link from "next/link";
// import React from "react";
// import TiltCard from "@/components/TiltCard"; // Correct import path

// import {
//   FaXTwitter,
//   FaInstagram,
//   FaFacebook,
//   FaYoutube,
// } from "react-icons/fa6";

// const SportsPage = () => {
//   const socials = [
//     {
//       name: "x",
//       link: "https://twitter.com/",
//       icon: (
//         <FaXTwitter className="size-6 text-white hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "instagram",
//       link: "https://instagram.com/",
//       icon: (
//         <FaInstagram className="size-6 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "facebook",
//       link: "https://facebook.com/",
//       icon: (
//         <FaFacebook className="size-6 hover:text-blue-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//     {
//       name: "youtube",
//       link: "https://youtube.com/",
//       icon: (
//         <FaYoutube className="size-6 hover:text-red-500 hover:scale-110 transition-transform duration-200" />
//       ),
//     },
//   ];

//   const arenas = [
//     {
//       name: "Indoor",
//       activities: ["Gaming", "Badminton", "Table Tennis", "Chess"],
//       link: "/indoor",
//     },
//     {
//       name: "Outdoor",
//       activities: ["Cricket", "Football", "Basketball"],
//       link: "/outdoor",
//     },
//   ];

//   return (
//     <main className="absolute z-10">
//       {/* --- Countdown Section --- */}
//       <section className="h-screen w-screen flex flex-col justify-center items-center">
//         <div className="flex flex-col justify-center items-center w-full">
//           <h1 className="text-3xl mb-4 text-center underline">
//             Banner Drops in
//           </h1>
//           <CountdownTimer targetDate="2025-11-03T00:00:00" />
//         </div>
//         <div className="bottom-0 flex flex-row gap-x-5 mt-10">
//           {socials.map((social, index) => (
//             <Link
//               key={social.name}
//               href={social.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`${`hover:text-${social.color}-400`} transition-colors`}
//             >
//               {social.icon}
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* --- Arena Section --- */}
//       <section 
//         className="h-screen w-screen flex flex-col justify-center items-center"
//         style={{ perspective: "1500px" }} // Required for 3D tilt
//       >
//         <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center">
//           Choose Your Arena
//         </h1>
//         <p className="text-gray-300 mb-12 text-center">
//           Select your battlefield and dominate!
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
//           {arenas.map((arena) => (
//             <Link
//               key={arena.name}
//               href={`/sports${arena.link}`}
//               className="w-full h-full" // Make link fill the grid cell
//             >
//               {/* Pass only layout and cursor classes. 
//                 All border, padding, and background styles 
//                 are now handled inside TiltCard.js
//               */}
//               <TiltCard
//                 className="w-full h-full cursor-pointer"
//               >
//                 {/* This content is passed as {children} to TiltCard */}
//                 <h2 className="text-3xl font-semibold mb-4">{arena.name}</h2>
//                 <p className="text-gray-300 mb-6">
//                   {arena.activities.join(" · ")}
//                 </p>
//                 <span
//                   className="self-start text-white font-medium underline hover:text-gray-400 transition-colors"
//                 >
//                   Enter →
//                 </span>
//               </TiltCard>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default SportsPage;




"use client";

import CountdownTimer from "@/myComponents/CountdownTimer";
import Link from "next/link";
import React from "react";
import TiltCard from "@/components/TiltCard";
import ParticleBackground from "@/components/ui/ParticleBackground"; // 1. Import background
import CometCursor from "@/components/ui/CometCursor"; // 2. Import comet cursor
import { motion } from "framer-motion";

import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";

const SportsPage = () => {
  const socials = [
    {
      name: "x",
      link: "https://twitter.com/",
      icon: (
        <FaXTwitter className="size-6 text-white hover:scale-110 transition-transform duration-200" />
      ),
    },
    {
      name: "instagram",
      link: "https://instagram.com/",
      icon: (
        <FaInstagram className="size-6 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />
      ),
    },
    {
      name: "facebook",
      link: "https://facebook.com/",
      icon: (
        <FaFacebook className="size-6 hover:text-blue-500 hover:scale-110 transition-transform duration-200" />
      ),
    },
    {
      name: "youtube",
      link: "https://youtube.com/",
      icon: (
        <FaYoutube className="size-6 hover:text-red-500 hover:scale-110 transition-transform duration-200" />
      ),
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
      {/* --- Particle Background (z-0) --- */}
      <ParticleBackground />
      
      {/* --- Comet Cursor (z-1) --- */}
      <CometCursor /> 
      
      {/* --- Page Content (z-10) --- */}
      <main className="relative z-10"> 
        {/* --- Countdown Section --- */}
        <section className="h-screen w-screen flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center w-full"
          >
            <h1 className="text-3xl mb-4 text-center underline">
              Banner Drops in
            </h1>
            <CountdownTimer targetDate="2025-11-03T00:00:00" />
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
        <section 
          className="h-screen w-screen flex flex-col justify-center items-center"
          style={{ perspective: "1500px" }}
        >
          {/* Animate the section headers */}
           <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-2 text-center"
          >
            Choose Your Arena
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 mb-12 text-center"
          >
            Select your battlefield and dominate!
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
            {arenas.map((arena, index) => (
              // Wrap each card in a motion.div to animate it
              <motion.div
                key={arena.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="w-full h-full"
              >
                <Link
                  href={`/sports${arena.link}`}
                  className="w-full h-full"
                >
                  <TiltCard
                    className="w-full h-full cursor-pointer"
                  >
                    <h2 className="text-3xl font-semibold mb-4">{arena.name}</h2>
                    <p className="text-gray-300 mb-6">
                      {arena.activities.join(" · ")}
                    </p>
                    <span
                      className="self-start text-white font-medium underline hover:text-gray-400 transition-colors"
                    >
                      Enter →
                    </span>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default SportsPage;