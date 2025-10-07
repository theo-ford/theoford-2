"use client";

import { useEffect } from "react";
import { useNavigationContext } from "@/app/context/navigation-context";

// Attach to homepage to track which hero is active when clicking outbound links
// heroId can be "hero1" | "between" | "hero2" by computing visibility
export default function HeroObserver() {
    const { setLastSource } = useNavigationContext();

    useEffect(() => {
        const hero1 = document.getElementById("hero1");
        const hero2 = document.getElementById("hero2");

        if (!hero1 || !hero2) return;

        let hero1Visible = false;
        let hero2Visible = false;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.target === hero1) hero1Visible = entry.isIntersecting;
                    if (entry.target === hero2) hero2Visible = entry.isIntersecting;
                }
                if (hero1Visible) {
                    setLastSource("primary");
                } else if (hero2Visible) {
                    setLastSource("secondary");
                } else {
                    // Between heroes → no animation, final state
                    setLastSource("final");
                }
            },
            { threshold: 0.5 }
        );

        io.observe(hero1);
        io.observe(hero2);
        return () => io.disconnect();
    }, [setLastSource]);

    return null;
}


