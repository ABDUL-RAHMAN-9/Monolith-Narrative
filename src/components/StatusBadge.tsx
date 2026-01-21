import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StatusBadge = () => {
    const [isHidden, setIsHidden] = useState(false);

    const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });

    useEffect(() => {
        // Create a ScrollTrigger that detects when we hit the footer
        const trigger = ScrollTrigger.create({
            trigger: "footer", // It watches the footer section
            start: "top 90%", // As soon as the footer enters the bottom 10% of screen
            onEnter: () => setIsHidden(true), // Hide when footer appears
            onLeaveBack: () => setIsHidden(false), // Show when scrolling back up
        });

        return () => trigger.kill();
    }, []);

    return (
        <AnimatePresence>
            {!isHidden && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }} // Smooth slide down when disappearing
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center bg-background border border-zinc-800 p-[1px] overflow-hidden">
                    <div className="flex items-center gap-3 px-3 py-1.5">
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground"></span>
                        </div>

                        <span className="mono-text text-[9px] text-foreground tracking-[0.2em]">
                            System Active
                        </span>

                        <div className="w-[1px] h-3 bg-zinc-800" />

                        <span className="mono-text text-[9px] text-zinc-500 lowercase">
                            {currentTime} GMT
                        </span>
                    </div>
                    <motion.div className="absolute inset-0 bg-foreground/5 opacity-0 hover:opacity-100 transition-opacity cursor-crosshair" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StatusBadge;
