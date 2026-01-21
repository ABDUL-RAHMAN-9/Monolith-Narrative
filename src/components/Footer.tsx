import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const Footer = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState("");

    // Update Local Time
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { 
                hour12: false, 
                hour: "2-digit", 
                minute: "2-digit" 
            }) + " GMT");
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const pages = [
        { label: "Home", href: "#" },
        { label: "Selected Works", href: "#work" },
        { label: "Identity", href: "#about" },
    ];

    const services = [
        { label: "Brand Strategy", href: "#" },
        { label: "Visual Identity", href: "#" },
        { label: "Digital Product", href: "#" },
        { label: "Motion Design", href: "#" },
    ];

    const socials = [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Twitter / X", href: "https://twitter.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current,
                { y: "100%" },
                {
                    y: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            gsap.fromTo(".footer-item",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: infoRef.current,
                        start: "top 90%",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer
            id="contact"
            ref={sectionRef}
            className="px-6 md:px-12 pt-32 pb-12 bg-background border-t border-zinc-900 overflow-hidden"
        >
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <span className="mono-text text-zinc-500 uppercase tracking-[0.4em]">
                        02 / Closing Narrative
                    </span>
                    <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="mono-text text-zinc-400">{time} — Local Status</span>
                    </div>
                </div>

                {/* MASSIVE TITLES: HOVER EFFECTS */}
                <div className="overflow-hidden mb-24 md:mb-40 group relative">
                    <motion.h2
                        ref={titleRef}
                        whileHover={{ skewX: -5 }}
                        className="footer-title transition-all duration-700 cursor-pointer"
                    >
                        GET IN TOUCH
                    </motion.h2>
                    {/* Decorative sliding text on hover */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                        <span className="text-[10vw] font-display italic">Available Now</span>
                    </div>
                </div>

                {/* THE INFORMATION GRID */}
                <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32 border-b border-zinc-900 pb-24">
                    
                    {/* EMAIL COLUMN */}
                    <div className="md:col-span-4 footer-item">
                        <span className="mono-text text-zinc-500 block mb-8 uppercase">Start a Project</span>
                        <motion.a
                            href="mailto:hello@monolith.studio"
                            className="relative group inline-block"
                        >
                            <span className="text-2xl md:text-3xl lg:text-4xl font-display tracking-tight text-foreground">
                                hello@monolith.studio
                            </span>
                            <div className="w-0 h-px bg-white group-hover:w-full transition-all duration-500 mt-2" />
                            <p className="mt-4 mono-text text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                Click to open mail client
                            </p>
                        </motion.a>
                    </div>

                    {/* SERVICES COLUMN */}
                    <div className="md:col-span-2 md:col-start-6 footer-item">
                        <span className="mono-text text-zinc-500 block mb-8 uppercase">Expertise</span>
                        <ul className="space-y-4">
                            {services.map((item) => (
                                <li key={item.label} className="mono-text text-[10px] text-zinc-400 hover:text-white transition-colors cursor-crosshair">
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* NAV COLUMN */}
                    <div className="md:col-span-2 footer-item">
                        <span className="mono-text text-zinc-500 block mb-8 uppercase">Menu</span>
                        <ul className="space-y-4">
                            {pages.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-zinc-400 hover:text-white transition-colors text-[11px] uppercase tracking-wider block">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SOCIALS COLUMN */}
                    <div className="md:col-span-2 footer-item">
                        <span className="mono-text text-zinc-500 block mb-8 uppercase">Connect</span>
                        <ul className="space-y-4">
                            {socials.map((link) => (
                                <li key={link.label}>
                                    <motion.a 
                                        whileHover={{ x: 5 }}
                                        href={link.href} 
                                        target="_blank"
                                        className="text-zinc-400 hover:text-white transition-colors text-[11px] uppercase tracking-wider block"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* SUB-FOOTER / LEGAL */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-900/50">
                    <div className="flex items-center gap-4">
                        <span className="mono-text text-zinc-600 text-[9px]">© 2026 MONOLITH NARRATIVE</span>
                        <div className="w-8 h-px bg-zinc-800" />
                        <span className="mono-text text-zinc-600 text-[9px]">All Rights Reserved</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="https://github.com/ABDUL-RAHMAN-9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-900 px-4 py-2 flex items-center gap-3 border border-zinc-800 group"
                        >
                            <div className="w-1 h-1 rounded-full bg-white group-hover:animate-ping" />
                            <span className="mono-text text-[10px] text-zinc-400 group-hover:text-white transition-colors">
                                DEV BY ABDUL RAHMAN
                            </span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;