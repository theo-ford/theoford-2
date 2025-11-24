"use client";

import { createContext, useContext, useMemo, useState } from "react";

type ScrollState = "hero1" | "hero2" | "content" | null;

interface HomepageState {
    scrollState: ScrollState;
    setScrollState: (state: ScrollState | ((prev: ScrollState) => ScrollState)) => void;
}

const HomepageContext = createContext<HomepageState | null>(null);

export function HomepageProvider({ children }: { children: React.ReactNode }) {
    const [scrollState, setScrollState] = useState<ScrollState>("hero1");

    // Wrap setScrollState to add logging
    const setScrollStateWithLog = (state: ScrollState | ((prev: ScrollState) => ScrollState)) => {
        if (typeof state === "function") {
            setScrollState((prev) => {
                const newState = state(prev);
                // console.log("[HomepageContext] State changed:", prev, "->", newState);
                return newState;
            });
        } else {
            // console.log("[HomepageContext] State changed:", scrollState, "->", state);
            setScrollState(state);
        }
    };

    const value = useMemo(() => ({ scrollState, setScrollState: setScrollStateWithLog }), [scrollState]);
    return <HomepageContext.Provider value={value}>{children}</HomepageContext.Provider>;
}

export function useHomepageContext(): HomepageState {
    const ctx = useContext(HomepageContext);
    if (!ctx) throw new Error("useHomepageContext must be used within HomepageProvider");
    return ctx;
}

export function useHomepageContextOptional(): HomepageState | null {
    return useContext(HomepageContext);
}

