"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigationContext } from "@/app/context/navigation-context";
import { LOGO_STYLES } from "@/app/constants/logo-styles";
import LogoTarget from "@/app/components/LogoTarget";

// Decide which logo to render and whether to animate (shared element) or show final instantly
export default function RouteLogoSwitcher({
    // sizes for final targets on this page - now optional with defaults
    smallLogoClassName = LOGO_STYLES.small,
    mediumLogoClassName = LOGO_STYLES.medium,
}: {
    smallLogoClassName?: string;
    mediumLogoClassName?: string;
}) {
    const { lastSource } = useNavigationContext();
    const [isDirect, setIsDirect] = useState(false);

    useEffect(() => {
        // Direct visit heuristic: no referrer within app
        const isDirectVisit = document.referrer === "" || !document.referrer.includes(location.host);
        setIsDirect(isDirectVisit && lastSource === null);
    }, [lastSource]);

    // Decide which logo to show
    const mode = useMemo(() => {
        if (isDirect || lastSource === "final") return "final"; // show final instantly
        if (lastSource === "small") return "small";
        // default to secondary for all other cases
        return "medium";
    }, [isDirect, lastSource]);

    if (mode === "medium") {
        // Render secondary at its final target by default; if you need per-page override, adjust here
        return <LogoTarget className={mediumLogoClassName} />;
    }
    if (mode === "small") {
        return <LogoTarget className={smallLogoClassName} />;
    }
    return <LogoTarget className={mediumLogoClassName} />;
}