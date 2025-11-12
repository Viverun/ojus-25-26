"use client";

import Link from "next/link";
import { Nova_Square } from "next/font/google";

const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DomeGallery from "@/components/DomeGallery";

const OjusCommonPage = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <div
      className={`cursor-none w-full min-h-screen text-white font-sans overflow-x-hidden scroll-smooth scroll-my-10 ${nova.className}`}
    >
      {/* ------------------ SECTION 1 ------------------ */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted>
          <source
            src="https://res.cloudinary.com/dzcxkso7f/video/upload/f_auto,q_auto:good,vc_auto/ojus-bg-vid_ympxx4.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div className="relative w-full h-full flex flex-col z-20 text-center">
          {/* Navbar */}
          <div className="h-20 w-full p-4 flex items-center justify-between">
            <Link href="/" className="cursor-none h-full flex items-center">
              <img
                src="/logo.jpg"
                alt="ojus logo"
                className="h-full rounded-full scale-75 sm:scale-90 md:scale-100 object-contain"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href={"#highlights"}
                className="cursor-none  font-bold text-lg sm:text-xl bg-purple-500 text-white px-3 sm:px-4 py-1 rounded-lg"
              >
                HIGHLIGHTS
              </Link>

              <Link href={"#"} className="cursor-none font-bold text-lg sm:text-xl">
                LOGIN
              </Link>
            </div>
          </div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col justify-center items-center md:justify-end md:items-start h-full w-full px-6 sm:px-12 lg:px-20 pb-20 text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">OJUS 2025</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl opacity-90">OJUS theme of theme</h2>
            <p className="text-sm sm:text-base md:text-lg opacity-80">Get ready for ojus 2025</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                href={"/sports"}
                className="cursor-none transform hover:transition-x-1 px-5 py-2 bg-purple-500 text-white font-semibold rounded-lg text-lg hover:bg-purple-400 transition"
              >
                SPORTS
              </Link>
              <Link
                href={"/cultural"}
                className="cursor-none px-5 py-2 bg-purple-500 text-white font-semibold rounded-lg text-lg hover:bg-purple-400 transition"
              >
                CULTURAL
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------ SECTION 2 ------------------ */}
      <section className="w-full min-h-screen flex justify-center items-center px-6 sm:px-10 md:px-20 py-16 bg-white text-black">
        <div className="flex flex-col md:flex-row justify-between gap-16 w-full">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none">ABOUT</h2>
            <h1 className="text-7xl sm:text-8xl md:text-[120px] font-extrabold leading-none mt-2">OJUS</h1>

            <p className="mt-8 text-base sm:text-lg leading-relaxed max-w-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minima officiis excepturi
              temporibus! Velit iste maxime necessitatibus minima ratione libero officiis explicabo facilis doloremque
              fugit dignissimos, delectus deserunt, inventore dolore ea quam. Distinctio iusto nulla unde quos,
              veritatis sed consequatur quo vero nostrum natus voluptate odit doloribus illo, nam, eaque repudiandae
              eligendi esse quibusdam exercitationem. Amet modi voluptates dolores repellat!
            </p>
          </motion.div>

          {/* RIGHT QR */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            className="hidden md:flex md:flex-1 md:flex-col items-end text-right"
          >
            <p className="text-xs tracking-widest">OJUS</p>
            <p className="text-xs tracking-widest">25</p>
            <img src="https://placehold.co/600x400" alt="Videos of OJUS" className="w-24 sm:w-28 md:w-32 h-auto mt-2" />
            <p className="text-xs mt-1 tracking-widest">2024</p>
          </motion.div>
        </div>
      </section>

      {/* ------------------ SECTION 3 ------------------ */}
      <section className="w-full min-h-screen flex justify-center items-center px-6 sm:px-12 md:px-20 py-16 bg-black text-white">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-16 w-full">
          {/* QR LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            className="hidden md:flex md:flex-1 md:flex-col items-center justify-center size-1/2 text-right"
          >
            <img src="https://placehold.co/600x400" alt="Photos of APSIT" className="w-24 sm:w-28 md:w-32 h-auto" />
          </motion.div>

          {/* TEXT RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none">ABOUT</h2>
            <h1 className="text-7xl sm:text-8xl md:text-[120px] font-extrabold leading-none mt-2">APSIT</h1>

            <p className="mt-8 text-base sm:text-lg leading-relaxed max-w-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe natus temporibus tempora earum adipisci.
              Sunt unde commodi non laudantium nostrum dolore aliquid ut qui hic veniam sed quis maiores suscipit
              temporibus enim, tenetur incidunt deserunt ex consequatur placeat voluptatem nulla delectus praesentium.
              Incidunt soluta nam rem, nemo reiciendis eius? Maxime, aut harum, porro nemo ullam ipsa sapiente expedita
              vero tempore, consequuntur amet quo soluta ad ratione. Adipisci amet eligendi, maiores ut nostrum nihil,
              minus totam non animi obcaecati molestias quisquam?
            </p>
          </motion.div>
        </div>
      </section>

      {/* --------- --------- SECTION 4 ------------------ */}
      <section id="highlights" style={{ width: "100vw", height: "90vh" }}>
        <DomeGallery grayscale={false} fitBasis={"max"} minRadius={1000} />
      </section>
    </div>
  );
};

export default OjusCommonPage;
