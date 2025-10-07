"use client";

import Logo from "@/app/components/Logo";
import React, { useRef, useState, useEffect } from "react";

export default function HomepageLogo() {
  const LogoConRef = useRef(null);
  var [positionState, setPositionState] = useState(false);

  function handleScroll() {
    // console.log("handleScroll Firing");
    const position = window.pageYOffset;
    // console.log(position);
    if (position > 1100) {
      // console.log("greater than 1100");
      setPositionState(true);
    } else if (position < 1100) {
      // console.log("less than 1100");
      setPositionState(false);
    }
  }

  useEffect(() => {
    // console.log("use Effect Firing");
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mix-blend-exclusion">
      {/* <div
        ref={LogoConRef}
        className={`${positionState ? "animate-logoScaleLargeToMid " : "animate-logoScaleMidToLarge"} ease-[cubic-bezier(0.95,0.05,0.795,0.035)]`}
      > */}
      <div
        ref={LogoConRef}
        className={`${positionState ? "animate-logoScaleLargeToMid " : "animate-logoScaleMidToLarge"}`}
      >
        <Logo />
        {/* <img src={Logo} /> */}
      </div>
    </div>
  );
}
