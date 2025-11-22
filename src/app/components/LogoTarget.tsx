"use client";

import { motion } from "framer-motion";
import Logo from "@/app/components/Logo";

export default function LogoTarget({
    className
}: {
    className?: string;
}) {
    return (
        <motion.div layoutId="logo-target" className={className}>
            <Logo />
        </motion.div>
    );
}


