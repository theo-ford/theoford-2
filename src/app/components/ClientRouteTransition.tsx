"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientRouteTransition({
    children
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={pathname ?? "root"}>{children}</motion.div>
        </AnimatePresence>
    );
}


