"use client";

import { motion } from "framer-motion";

export default function ContentFade({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        >
            {children}
        </motion.div>
    );
}


