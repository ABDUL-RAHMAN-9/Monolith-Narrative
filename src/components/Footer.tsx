import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState("");
    const [copied, setCopied] = useState(false);

    const email = "abdulrahman161004@gmail.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                }) + " GMT",
            );
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
        { label: "Brand Strategy" },
        { label: "Visual Identity" },
        { label: "Digital Product" },
        { label: "Motion Design" },
    ];

    const socials = [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Twitter / X", href: "https://twitter.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { y: "100%" },
                {
                    y: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                },
            );

            gsap.fromTo(
                ".footer-item",
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
                },
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer
            id="contact"
            ref={sectionRef}
            className="px-6 md:px-12 pt-32 pb-12 bg-background border-t border-zinc-900 overflow-hidden">
            <div className="max-w-[1800px] mx-auto">
                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-16">
                    <span className="mono-text text-zinc-500 uppercase tracking-[0.4em]">
                        02 / Closing Narrative
                    </span>
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="mono-text text-zinc-400">{time}</span>
                    </div>
                </div>

                {/* MAIN TITLE */}
                <div className="overflow-hidden mb-24 md:mb-40 group relative">
                    <motion.h2
                        ref={titleRef}
                        whileHover={{ skewX: -5 }}
                        className="footer-title cursor-pointer leading-[0.8]">
                        GET IN TOUCH
                    </motion.h2>
                </div>

                {/* THE GRID SYSTEM */}
                <div
                    ref={infoRef}
                    className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 border-b border-zinc-900 pb-24">
                    {/* LEFT SIDE: Narrative & Contact (6 Columns) */}
                    <div className="md:col-span-6 footer-item flex flex-col justify-between">
                        <div className="relative">
                            <span className="mono-text text-zinc-500 block mb-8 uppercase tracking-[0.3em]">
                                Start a Project //
                            </span>
                            <div className="group relative inline-block">
                                <motion.a
                                    href={`mailto:${email}`}
                                    onClick={handleCopyEmail}
                                    className="relative z-10 block cursor-pointer">
                                    <span className="text-2xl md:text-3xl lg:text-5xl font-display tracking-tight text-foreground leading-none break-all">
                                        {email}
                                    </span>
                                    <div className="w-0 h-px bg-white group-hover:w-full transition-all duration-500 mt-4" />
                                </motion.a>

                                <AnimatePresence>
                                    {copied && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: -10 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="absolute top-[-40px] left-0 bg-white text-black px-3 py-1 mono-text text-[10px] font-bold z-20">
                                            COPIED
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <p className="mt-6 mono-text text-[9px] text-zinc-600">
                                    Click to Copy / Open Client
                                </p>
                            </div>
                        </div>

                        {/* BIO DATA */}
                        <div className="mt-16 grid grid-cols-2 gap-4 pt-10 border-t border-zinc-900/50">
                            <div>
                                <span className="mono-text text-[9px] text-zinc-600 block mb-2 uppercase tracking-widest">
                                    Localization
                                </span>
                                <p className="text-zinc-300 text-[11px] uppercase tracking-widest">
                                    India / UTC+05:30
                                </p>
                            </div>
                            <div>
                                <span className="mono-text text-[9px] text-zinc-600 block mb-2 uppercase tracking-widest">
                                    Availability
                                </span>
                                <p className="text-zinc-300 text-[11px] uppercase tracking-widest leading-relaxed">
                                    Freelance + Full-time
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Navigation Stacks (6 Columns total, split into 3 groups) */}
                    <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-4 h-full items-start">
                        {/* Expertise */}
                        <div className="footer-item">
                            <span className="mono-text text-zinc-500 block mb-8 uppercase tracking-widest">
                                Expertise
                            </span>
                            <ul className="space-y-4">
                                {services.map((item) => (
                                    <li
                                        key={item.label}
                                        className="mono-text text-[10px] text-zinc-400 cursor-crosshair">
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigation */}
                        <div className="footer-item">
                            <span className="mono-text text-zinc-500 block mb-8 uppercase tracking-widest">
                                Index
                            </span>
                            <ul className="space-y-4">
                                {pages.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-zinc-400 hover:text-white transition-colors text-[10px] uppercase tracking-widest block">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div className="footer-item col-span-2 md:col-span-1">
                            <span className="mono-text text-zinc-500 block mb-8 uppercase tracking-widest">
                                Social
                            </span>
                            <ul className="flex flex-row md:flex-col gap-6 md:gap-4">
                                {socials.map((link) => (
                                    <li key={link.label}>
                                        <motion.a
                                            whileHover={{ x: 5 }}
                                            href={link.href}
                                            target="_blank"
                                            className="text-zinc-400 hover:text-white transition-colors text-[10px] uppercase tracking-widest block">
                                            {link.label}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 mt-10">
                    <div className="flex items-center gap-4">
                        <span className="mono-text text-zinc-600 text-[9px]">
                            © 2026 MONOLITH
                        </span>
                        <div className="w-8 h-px bg-zinc-800" />
                        <span className="mono-text text-zinc-600 text-[9px]">
                            All Rights Reserved
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        {/* THE KINETIC SIGNATURE */}
                        <motion.a
                            href="https://github.com/ABDUL-RAHMAN-9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col items-end overflow-hidden">
                            {/* TOP METADATA */}
                            <div className="flex gap-4 mb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <span className="mono-text text-[8px] text-zinc-600 uppercase italic">
                                    Code-Base: React/TS
                                </span>
                            </div>

                            {/* MAIN NAME DISPLAY */}
                            <div className="relative">
                                <div className="flex items-center gap-6">
                                    <div className="h-px w-8 bg-zinc-800 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
                                    <span className="font-display text-xl md:text-2xl tracking-tighter text-zinc-500 group-hover:text-white transition-colors duration-500 uppercase font-bold">
                                        Abdul Rahman
                                    </span>
                                </div>

                                {/* THE "MARQUEE" SLIDE-OVER */}
                                <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
                                    <motion.span
                                        initial={{ x: "100%" }}
                                        whileHover={{ x: "-100%" }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="whitespace-nowrap font-display text-xl md:text-2xl tracking-tighter text-white opacity-0 group-hover:opacity-100 uppercase">
                                        &nbsp; SYSTEM ARCHITECT — SYSTEM
                                        ARCHITECT — SYSTEM ARCHITECT —
                                    </motion.span>
                                </div>
                            </div>

                            {/* BOTTOM ROLE */}
                            <div className="mt-1 flex items-center gap-2">
                                <span className="mono-text text-[9px] text-zinc-600 tracking-[0.4em] uppercase">
                                    Constructed by
                                </span>
                                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                            </div>
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
