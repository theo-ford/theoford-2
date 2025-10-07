"use client";

import { motion } from "framer-motion";
import Logo from "@/app/components/Logo";

export default function SharedSecondaryLogoTarget({
    className
}: {
    className?: string;
}) {
    return (
        <motion.div layoutId="site-logo-secondary" className={className}>
            <Logo />
        </motion.div>
    );
}


