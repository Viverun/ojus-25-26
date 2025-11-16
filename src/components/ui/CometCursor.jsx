"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

const CometCursor = () => {
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
        color: "transparent",
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "trail",
          },
        },
        modes: {
          trail: {
            delay: 0,
            pauseOnStop: false,
            quantity: 5,
          },
        },
      },
      particles: {
        color: {
          value: ["#8a2be2", "#00d0ff", "#ff00c3"],
        },
        move: {
          enable: true,
          speed: 3,
          outModes: "destroy",
        },
        number: {
          value: 0,
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
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
      id="tsparticles-cursor"
      options={particleOptions}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-1"
    />
  );
};

export default CometCursor;