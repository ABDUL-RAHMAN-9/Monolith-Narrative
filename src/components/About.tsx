import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const techBlockRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. High-end Split Text Reveal for Heading
            const heading = headingRef.current;
            if (heading) {
                const text = heading.textContent || "";
                heading.innerHTML = text
                    .split(" ")
                    .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-[110%]">${word}&nbsp;</span></span>`)
                    .join("");

                gsap.to(heading.querySelectorAll("span > span"), {
                    y: 0,
                    duration: 1,
                    stagger: 0.02,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                    },
                });
            }

            // 2. Technical Block Line Drawing Animation
            gsap.fromTo(".tech-line", 
                { scaleX: 0 }, 
                { 
                    scaleX: 1, 
                    duration: 1.5, 
                    stagger: 0.2, 
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: techBlockRef.current,
                        start: "top 80%",
                    }
                }
            );

            // 3. Services Stagger Reveal
            gsap.fromTo(".service-item", 
                { opacity: 0, x: -10 }, 
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8, 
                    stagger: 0.1, 
                    scrollTrigger: {
                        trigger: servicesRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const disciplines = [
        "Visual Identity",
        "Motion Systems",
        "Digital Strategy",
        "Creative Direction",
        "Structural UI/UX",
        "Typography Design"
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="px-6 md:px-12 py-32 md:py-64 bg-background relative overflow-hidden"
        >
            {/* CENTERED BACKGROUND DECORATION */}
            <div className="absolute bottom-260 inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="hero-title text-[13vw] leading-none uppercase select-none opacity-[0.09] whitespace-nowrap">
                    Identity
                </span>
            </div>

            <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 relative z-10">
                
                {/* LEFT COLUMN: Narrative & Philosophy */}
                <div className="md:col-span-7 flex flex-col justify-center">
                    <span className="mono-text text-zinc-500 mb-8 block uppercase tracking-[0.4em]">
                        01 / Perspective
                    </span>
                    
                    <h2
                        ref={headingRef}
                        className="about-heading max-w-4xl mb-16 text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
                    >
                        Building structural narratives that balance 
                        brutalist foundations with digital fluidity.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
                        <div className="space-y-4">
                            <span className="mono-text text-zinc-400 block border-b border-zinc-900 pb-2">Core Ethos</span>
                            <p className="text-zinc-500 text-sm leading-relaxed font-light">
                                Design is architecture for the digital space. We build systems 
                                that aren't just seen, but felt. Our focus remains on high-contrast 
                                aesthetics and structural integrity across all platforms.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <span className="mono-text text-zinc-400 block border-b border-zinc-900 pb-2">Methodology</span>
                            <p className="text-zinc-500 text-sm leading-relaxed font-light">
                                From deep-rooted visual strategy to motion-led interfaces, 
                                every creative decision is calculated to drive the narrative 
                                of luxury and technical precision.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: The "Technical Dossier" UI (Instead of Image) */}
                <div className="md:col-span-5 flex flex-col justify-center">
                    <div 
                        ref={techBlockRef}
                        className="bg-zinc-950/50 border border-zinc-900 p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Decorative Lines */}
                        <div className="tech-line absolute top-0 left-0 w-full h-px bg-zinc-800 origin-left" />
                        <div className="tech-line absolute bottom-0 right-0 w-full h-px bg-zinc-800 origin-right" />
                        
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <span className="mono-text text-[10px] text-white">System: Monolith.v4</span>
                                <p className="mono-text text-[8px] text-zinc-600 mt-1">Status: Fully Operational</p>
                            </div>
                            <div className="text-right">
                                <span className="mono-text text-[10px] text-zinc-500 italic">Est. 2024</span>
                            </div>
                        </div>

                        {/* Disciplines List */}
                        <div ref={servicesRef} className="space-y-6">
                            <span className="mono-text text-[9px] text-zinc-600 block uppercase mb-4 tracking-widest">
                                Core Disciplines
                            </span>
                            <div className="grid grid-cols-1 gap-4">
                                {disciplines.map((item, i) => (
                                    <div key={i} className="service-item flex items-center justify-between border-b border-zinc-900/50 pb-2">
                                        <span className="text-zinc-300 font-display text-lg md:text-xl uppercase tracking-tighter">
                                            {item}
                                        </span>
                                        <span className="mono-text text-[8px] text-zinc-700">Mod. 0{i+1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Animated Coordinates Footer */}
                        <div className="mt-16 flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="mono-text text-[8px] text-zinc-700">Lat: 45.5152 N</p>
                                <p className="mono-text text-[8px] text-zinc-700">Lng: 122.6784 W</p>
                            </div>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                className="px-6 py-3 bg-white text-black mono-text text-[10px] uppercase font-bold"
                            >
                                Initiate Project
                            </motion.a>
                        </div>
                    </div>

                    <p className="mt-8 mono-text text-[9px] text-zinc-600 text-center uppercase tracking-[0.4em]">
                        Digital Architecture for the Brave.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;