"use client";

import { motion } from "framer-motion";
import Logo from "@/app/components/Logo";

export default function LogoTargetTwo({
    className
}: {
    className?: string;
}) {
    return (
        <motion.div layoutId="logo-target-two" className={className}>
            <Logo />
        </motion.div>
    );
}


