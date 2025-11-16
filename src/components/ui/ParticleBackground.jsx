"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000", // Black background
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // Back to "repulse"
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.1, // Very slow, ambient movement
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 200, // Bring back the 200 stars
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles-bg" // Give it a unique ID
      options={particleOptions}
      className="fixed top-0 left-0 w-full h-full z-0" // Stays at z-0
    />
  );
};

export default ParticleBackground;