"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Logo from "@/app/components/Logo";

interface SecondaryLogoProps {
    className?: string;
}

export default function SecondaryLogo({ className }: SecondaryLogoProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const rawWidth = useMotionValue<string>("50vw");
    // Smooth, slower, more eased spring
    const width = useSpring(rawWidth, {
        stiffness: 80,
        damping: 42,
        mass: 1.5,
        restDelta: 0.001
    });

    useEffect(() => {
        function update() {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const logoCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2 + 0; // threshold: 100px past center

            if (logoCenter <= viewportCenter) {
                rawWidth.set("18.75vw");
            } else {
                rawWidth.set("50vw");
            }
        }

        update();
        const onScroll = () => update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [rawWidth]);

    return (
        <motion.div ref={ref} layoutId="site-logo-secondary" className={className} style={{ width }}>
            <Logo />
        </motion.div>
    );
}


