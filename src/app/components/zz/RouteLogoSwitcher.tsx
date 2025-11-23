// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useNavigationContext } from "@/app/context/navigation-context";
// import SharedSecondaryLogoTarget from "@/app/components/SharedSecondaryLogoTarget";
// import PrimaryLogoTarget from "@/app/components/PrimaryLogoTarget";

// // Decide which logo to render and whether to animate (shared element) or show final instantly
// export default function RouteLogoSwitcher({
//     // sizes for final targets on this page
//     primaryClassName,
//     secondaryClassName
// }: {
//     primaryClassName: string;
//     secondaryClassName: string;
// }) {
//     const { lastSource } = useNavigationContext();
//     const [isDirect, setIsDirect] = useState(false);

//     useEffect(() => {
//         // Direct visit heuristic: no referrer within app
//         const isDirectVisit = document.referrer === "" || !document.referrer.includes(location.host);
//         setIsDirect(isDirectVisit && lastSource === null);
//     }, [lastSource]);

//     // Decide which logo to show
//     const mode = useMemo(() => {
//         if (isDirect || lastSource === "final") return "final"; // show final instantly
//         if (lastSource === "primary") return "primary";
//         // default to secondary for all other cases
//         return "secondary";
//     }, [isDirect, lastSource]);

//     if (mode === "final") {
//         // Render secondary at its final target by default; if you need per-page override, adjust here
//         return <SharedSecondaryLogoTarget className={secondaryClassName} />;
//     }
//     if (mode === "primary") {
//         return <PrimaryLogoTarget className={primaryClassName} />;
//     }
//     return <SharedSecondaryLogoTarget className={secondaryClassName} />;
// }


