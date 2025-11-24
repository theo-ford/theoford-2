"use client";

import { useState, useEffect, useRef } from "react";

export default function CountdownTimer({ initialCount = 10 }: { initialCount?: number }) {
    const [count, setCount] = useState(initialCount);
    const timerRef = useRef<number | null>(null);
    const shouldAutoScrollRef = useRef(true);
    const lastScrollYRef = useRef(0);

    useEffect(() => {
        // Ensure we're in the browser
        if (typeof window === "undefined") return;

        // Function to decrement count
        const tick = () => {
            setCount((prevCount) => {
                if (prevCount <= 0) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                    return 0;
                }
                return prevCount - 1;
            });
        };

        // Start the timer
        timerRef.current = window.setInterval(tick, 1000);

        // Cleanup
        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    // Detect manual scrolling and disable auto-scroll
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (count <= 0) return; // No need to listen if timer already finished

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 10; // Minimum pixels to consider it intentional scrolling

            // If user scrolled more than threshold, disable auto-scroll
            if (Math.abs(currentScrollY - lastScrollYRef.current) > scrollThreshold) {
                shouldAutoScrollRef.current = false;
            }
            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        lastScrollYRef.current = window.scrollY;

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [count]);

    // Auto-scroll to hero2 when countdown reaches 0
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (count !== 0) return;
        if (!shouldAutoScrollRef.current) return;

        const hero2 = document.getElementById("hero2");
        if (hero2) {
            hero2.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [count]);

    return <p className="text-white text-center">{count}</p>;
}

