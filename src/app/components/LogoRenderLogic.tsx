"use client";

import { useEffect, useState } from "react";
import { useHomepageContextOptional } from "@/app/context/homepage-context";
import { useNavigationContext } from "@/app/context/navigation-context";
import LogoTargetOne from "./LogoTargetOne";
import LogoTargetTwo from "./LogoTargetTwo";
import Logo from "./Logo";

export default function LogoRenderLogic({
    className
}: {
    className?: string;
}) {
    const homepageContext = useHomepageContextOptional();
    const scrollState = homepageContext?.scrollState ?? null;
    const { lastSource } = useNavigationContext();
    const [isDirect, setIsDirect] = useState(false);

    useEffect(() => {
        // Direct visit heuristic: no referrer within app
        const isDirectVisit = document.referrer === "" || !document.referrer.includes(location.host);
        setIsDirect(isDirectVisit && lastSource === null);
    }, [lastSource]);

    // If homepage-context = content, render LogoTargetTwo (with animation)
    if (scrollState === "content") {
        console.log("scrollState", scrollState);
        console.log("logo two");
        // return <LogoTargetTwo className={className} ignoreStickyPosition={true} />;
        return <LogoTargetTwo className={className} />;
    }

    // If homepage-context = hero2 OR is a direct page visit, render LogoTargetOne without animation
    if (scrollState === "hero2" || isDirect) {
        // Render LogoTargetOne without layoutId to disable animation
        console.log("scrollState", scrollState);
        console.log("logo no animation");
        return (
            <div className={className}>
                <Logo />
            </div>
        );
    }

    // If homepage-context = hero1 (and not a direct visit), render LogoTargetOne (with animation)
    // Also default fallback for non-homepage pages (scrollState is null) - render with animation
    console.log("scrollState", scrollState);
    console.log("logo one");
    return <LogoTargetOne className={className} />;
}

