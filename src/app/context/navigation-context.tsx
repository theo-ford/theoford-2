"use client";

// import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createContext, useContext, useMemo, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

type SourceKind = "small" | "medium" | "final" | null;

interface NavigationState {
    lastSource: SourceKind; // where we navigated FROM on previous page
    setLastSource: (s: SourceKind) => void;
}

const NavigationContext = createContext<NavigationState | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [lastSource, setLastSource] = useState<SourceKind>(null);
    // We only need state + setter; pages will set this before push
    const value = useMemo(() => ({ lastSource, setLastSource }), [lastSource]);
    return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigationContext(): NavigationState {
    const ctx = useContext(NavigationContext);
    if (!ctx) throw new Error("useNavigationContext must be used within NavigationProvider");
    return ctx;
}


