"use client";
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="p-6">
      <div
        className="
        grid 
        grid-cols-2 gap-5 
        text-center 
        auto-cols-max
        md:grid-cols-4   /* Desktop = 4 in one row */
      "
      >
        {/* DAYS */}
        <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span className="mx-auto" style={{ "--value": timeLeft.days }}>
              {pad(timeLeft.days)}
            </span>
          </span>
          days
        </div>

        {/* HOURS */}
        <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span className="mx-auto" style={{ "--value": timeLeft.hours }}>
              {pad(timeLeft.hours)}
            </span>
          </span>
          hours
        </div>

        {/* MINUTES */}
        <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span className="mx-auto" style={{ "--value": timeLeft.minutes }}>
              {pad(timeLeft.minutes)}
            </span>
          </span>
          min
        </div>

        {/* SECONDS */}
        <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span className="mx-auto" style={{ "--value": timeLeft.seconds }}>
              {pad(timeLeft.seconds)}
            </span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
