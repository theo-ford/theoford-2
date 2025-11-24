"use client";

import { motion } from "framer-motion";
import Logo from "@/app/components/Logo";

export default function LogoTargetTwo({
    className,
    ignoreStickyPosition
}: {
    className?: string;
    ignoreStickyPosition?: boolean;
}) {
    return (
        <motion.div
            layoutId="logo-target-two"
            layout="size"
            className={className}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <Logo />
        </motion.div>
    );
}


