"use client";

import * as React from "react";

export function ScrollProgress() {
  const [scaleX, setScaleX] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScaleX(window.scrollY / scrollHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        transform: `scaleX(${scaleX})`,
        transformOrigin: "0 0",
      }}
      className="fixed top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#8478e0] to-[#fd9150] z-[80] pointer-events-none transition-transform duration-75"
      aria-hidden="true"
    />
  );
}
