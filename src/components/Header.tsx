import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Selected Works", href: "#work", id: "01" },
    { label: "Identity", href: "#about", id: "02" },
    { label: "Inquiries", href: "#contact", id: "03" },
];

const Header = () => {
    const headerRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [activeSection, setActiveSection] = useState("01");
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide/Show logic
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY.current) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            ref={headerRef}
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 mix-blend-difference">
            <nav className="flex items-center justify-between max-w-[1800px] mx-auto border-b border-white/10 pb-6">
                {/* BRAND LOGO / NAME */}
                <div className="flex flex-col">
                    <motion.a
                        href="#"
                        className="font-display text-foreground text-xl md:text-2xl uppercase tracking-tighter leading-none">
                        MONOLITH
                    </motion.a>
                    <span className="mono-text text-[10px] text-zinc-500 mt-1 uppercase tracking-[0.2em]">
                        Design Narrative / Vol.01
                    </span>
                </div>

                {/* DESKTOP NAVIGATION */}
                <ul className="hidden md:flex items-center gap-12">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1 + index * 0.05,
                            }}
                            className="relative group">
                            <a
                                href={item.href}
                                className="mono-text text-[10px] uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors flex items-center gap-2">
                                <span className="text-[10px] opacity-60">
                                    {item.id}
                                </span>
                                <span className="text-[10px] opacity-100">
                                    {item.label}
                                </span>
                            
                            </a>

                            {/* THE HOVER UNDERLINE */}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                        </motion.li>
                    ))}
                </ul>

                {/* MOBILE / RIGHT INFO */}
                <div className="flex items-center gap-4">
                    {/* BUTTON / CTA */}
                    <a
                        href="#contact"
                        className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all duration-500 mono-text text-[10px] uppercase">
                        Connect
                    </a>
                </div>
            </nav>
        </motion.header>
    );
};

export default Header;
