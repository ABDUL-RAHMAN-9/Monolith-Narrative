import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // High-end parallax for the main title
            // As you scroll down, the title moves up and scales down slightly
            gsap.to(titleRef.current, {
                y: -100,
                scale: 0.9,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="h-screen flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-16 pt-28 sm:pt-32 pb-10 sm:pb-12 relative bg-background overflow-hidden">
            {/* MAIN TITLE STAGE */}
            <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col justify-center items-center">
                <div className="relative w-full flex justify-center px-2 sm:px-4 md:px-8">
                    <h1
                        ref={titleRef}
                        className="hero-title select-none break-tight text-center flex flex-col items-center mx-auto max-w-[min(1100px,92vw)] text-[clamp(2.8rem,11vw,4.5rem)] md:text-[clamp(3.5rem,10.5vw,11rem)]">
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="block">
                                MONOLITH
                            </motion.span>
                        </span>
                    </h1>
                </div>
                {/* Design Narrative to the right side */}
                <div className="w-full flex justify-end items-center mt-[3vw] md:mt-[3vw] px-4 sm:px-6 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-px w-8 md:w-16 bg-zinc-800" />
                        <span className="font-sans italic text-lg md:text-3xl lg:text-4xl font-light tracking-tight text-zinc-400 capitalize whitespace-nowrap">
                            Design Narrative
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* BOTTOM NAV / SCROLL INDICATOR */}
            <div className="flex justify-between items-end w-full max-w-[1800px] mx-auto">
                <div className="hidden md:block">
                    <p className="mono-text max-w-[200px] lowercase leading-relaxed text-zinc-500">
                        Bridging the gap between structural brutalism and
                        digital fluidity.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex flex-col items-center gap-4 group">
                    <span className="mono-text text-[9px] group-hover:text-foreground transition-colors">
                        Scroll to explore
                    </span>
                    <div className="h-12 w-px bg-zinc-800 overflow-hidden">
                        <motion.div
                            animate={{ y: [-48, 48] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-full h-full bg-foreground"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
