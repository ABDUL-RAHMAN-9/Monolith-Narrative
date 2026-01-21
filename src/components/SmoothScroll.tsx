import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Sync GSAP with Lenis
        lenis.on("scroll", ScrollTrigger.update);
        const updateRaf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(updateRaf);

        // Simple Click Handler
        const handleAnchorClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");

            if (href === "#") {
                e.preventDefault();
                lenis.scrollTo(0);
            } else if (href?.startsWith("#")) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    lenis.scrollTo(target as HTMLElement);
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
            gsap.ticker.remove(updateRaf);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
