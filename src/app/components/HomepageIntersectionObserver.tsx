"use client";

import { useEffect } from "react";
import { useHomepageContext } from "@/app/context/homepage-context";

export default function HomepageIntersectionObserver() {
  const { scrollState, setScrollState } = useHomepageContext();

  useEffect(() => {
    // console.log("Current scrollState:", scrollState);
  }, [scrollState]);


  useEffect(() => {
    // Only run scroll logic if we're on the homepage (content element exists)
    const content = document.getElementById("content");
    if (!content) return; // Don't run on non-homepage pages

    const checkAtTop = () => {
      if (window.scrollY === 0) {
        // Don't reset to hero1 if we're in content state - preserve it
        setScrollState((prevState) => {
          if (prevState === "content") {
            return prevState; // Preserve content state
          }
          return "hero1";
        });
      } else {
        // If not at top, set to hero2 UNLESS state is "content"
        setScrollState((prevState) => {
          // Don't override content state - let content observer handle that
          if (prevState === "content") {
            return prevState;
          }
          return "hero2";
        });
      }
    };
    checkAtTop();
    window.addEventListener("scroll", checkAtTop, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkAtTop);
    };
  }, []);

  useEffect(() => {
    const content = document.getElementById("content");
    if (!content) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const viewportHeight = window.innerHeight;
          const visibleHeight = entry.intersectionRect.height;
          const viewportPercentage = visibleHeight / viewportHeight;

          if (viewportPercentage >= 0.5) {
            setScrollState("content");
          } else {
            // If content is less than 50% visible and we're not at the top, set to hero2
            if (window.scrollY > 0) {
              setScrollState("hero2");
            }
          }
          // When content is less than 50% visible, don't change state here
          // Let the scroll listener handle setting hero2 (which won't override content)
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Fire frequently to check viewport percentage
      }
    );
    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}