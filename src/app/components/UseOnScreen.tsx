import { useEffect, useState, useRef, RefObject, MutableRefObject } from "react";

export function useOnScreen<T extends Element = HTMLElement>(ref: RefObject<T> | MutableRefObject<T | null>) {
    // console.log("useOnSCreen");
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    // console.log("useOnScreen", ref);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                // console.log("IntersectionObserver entry:", entry.isIntersecting, entry.intersectionRatio);
                setIsOnScreen(entry.isIntersecting);
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: "0px"
            }
        );

        const observer = observerRef.current;
        observer.observe(element);

        return () => {
            if (observer && element) {
                observer.unobserve(element);
            }
            if (observer) {
                observer.disconnect();
            }
        };
    }, [ref]);

    return isOnScreen;
}
