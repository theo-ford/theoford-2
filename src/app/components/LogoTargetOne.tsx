"use client";

import { motion } from "framer-motion";
import Logo from "@/app/components/Logo";

export default function LogoTargetOne({
    className
}: {
    className?: string;
}) {
    return (
        <motion.div
            layoutId="logo-target-one"
            className={className}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <Logo />
        </motion.div>
    );
}


