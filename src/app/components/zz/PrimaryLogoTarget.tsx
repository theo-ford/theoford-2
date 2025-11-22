"use client";

import { motion } from "framer-motion";
import Logo from "@/app/components/Logo";

export default function PrimaryLogoTarget({
    className
}: {
    className?: string;
}) {
    return (
        <motion.div layoutId="site-logo-primary" className={className}>
            <Logo />
        </motion.div>
    );
}


