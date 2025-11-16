// "use client"; // This is crucial! It tells Next.js to run this as a client component

// import React, { useRef } from "react";

// const TiltCard = ({ children, className }) => {
//   const cardRef = useRef(null);
//   const glowRef = useRef(null);

//   const handleMouseMove = (e) => {
//     if (!cardRef.current || !glowRef.current) return;

//     // Get card's position and dimensions
//     const bounds = cardRef.current.getBoundingClientRect();
    
//     // Get mouse position relative to the card
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;
//     const leftX = mouseX - bounds.x;
//     const topY = mouseY - bounds.y;
    
//     // Calculate center of the card
//     const center = {
//       x: leftX - bounds.width / 2,
//       y: topY - bounds.height / 2,
//     };

//     // Calculate distance from center
//     const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

//     // Apply the 3D tilt transformation
//     cardRef.current.style.transform = `
//       scale3d(1.07, 1.07, 1.07)
//       rotate3d(
//         ${center.y / 100},
//         ${-center.x / 100},
//         0,
//         ${Math.log(distance) * 2}deg
//       )
//     `;

//     // Apply the glow effect
//     glowRef.current.style.backgroundImage = `
//       radial-gradient(
//         circle at
//         ${center.x * 2 + bounds.width / 2}px
//         ${center.y * 2 + bounds.height / 2}px,
//         #ffffff55,
//         #0000000f
//       )
//     `;
//   };

//   const handleMouseLeave = () => {
//     if (!cardRef.current || !glowRef.current) return;

//     // Reset styles
//     cardRef.current.style.transform = "";
//     glowRef.current.style.backgroundImage = "";
//   };

//   return (
//     <div
//       ref={cardRef}
//       // Combine base styles with any styles passed as props
//       className={`
//         relative shadow-md transition-transform transition-shadow duration-300 ease-out 
//         ${className}
//       `}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* The content of your card */}
//       {children}
      
//       {/* The Glow Element */}
//       <div
//         ref={glowRef}
//         className="absolute w-full h-full left-0 top-0 rounded-xl"
//       />
//     </div>
//   );
// };

// export default TiltCard;


"use client";

import React, { useRef } from "react";

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;

    // --- 1. Get card bounds and mouse position ---
    const bounds = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    // --- 2. UPDATED Hover-Aware Border Logic ---
    // We make the gradient size very large (e.g., 600px) so it's a 
    // huge aura that covers the whole card. The center of this 
    // aura follows the mouse, making the nearest border brightest.
    cardRef.current.style.background = `
      radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px, 
        #00d0ff, 
        #ff00c3, 
        transparent 35%
      )
    `;

    // --- 3. Original 3D Tilt Logic (unchanged) ---
    const center = {
      x: mouseX - bounds.width / 2,
      y: mouseY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    cardRef.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;

    // --- 4. Original Surface Glow Logic (unchanged) ---
    glowRef.current.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    cardRef.current.style.transform = "";
    cardRef.current.style.background = ""; // Reset the border background
    glowRef.current.style.backgroundImage = "";
  };

  return (
    // PARENT CONTAINER
    <div
      ref={cardRef}
      className={`
        relative rounded-xl overflow-hidden
        bg-gray-800 
        transition-[background] duration-100
        ${className} 
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* INNER CONTENT CONTAINER */}
      <div 
        className={`
          relative z-10 h-full w-full 
          rounded-[10px] 
          bg-gray-900 
          p-8 
          m-1 /* 1. INCREASED BORDER THICKNESS (was m-0.5, now m-1 = 4px) */
        `}
      >
        {/* 3D tilt surface glow */}
        <div
          ref={glowRef}
          className="absolute w-full h-full left-0 top-0 rounded-[10px] z-20"
        />
        
        {/* Your actual content */}
        <div className="relative z-30">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TiltCard;