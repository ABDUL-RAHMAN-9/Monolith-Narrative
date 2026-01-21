import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// 1. Define the Project Interface (This fixes the ESLint error)
interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    width: string;
    align: string;
    speed: number;
}

// Project Assets
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

// 2. Apply the Type to the array
const projects: Project[] = [
    {
        title: "MONOLITH",
        description: "Luxury Residencies",
        image: project1,
        tags: ["Architecture", "3D", "2024"],
        width: "w-full md:w-[65%]",
        align: "justify-start",
        speed: 1,
    },
    {
        title: "AXIOM",
        description: "Digital Ecosystem",
        image: project2,
        tags: ["Product", "UI/UX", "2024"],
        width: "w-full md:w-[40%]",
        align: "justify-end",
        speed: 1.2,
    },
    {
        title: "AETHER",
        description: "Visual Identity",
        image: project3,
        tags: ["Branding", "Motion", "2023"],
        width: "w-full md:w-[80%]",
        align: "justify-center",
        speed: 0.9,
    },
    {
        title: "FRAGMENT",
        description: "Editorial Archive",
        image: project4,
        tags: ["Print", "Design", "2023"],
        width: "w-full md:w-[45%]",
        align: "justify-start",
        speed: 1.1,
    },
    {
        title: "OBSIDIAN",
        description: "Creative Direction",
        image: project5,
        tags: ["Photography", "Web", "2023"],
        width: "w-full md:w-[50%]",
        align: "justify-end",
        speed: 1,
    },
    {
        title: "SYNTIX",
        description: "Next-Gen SaaS",
        image: project6,
        tags: ["Tech", "Interface", "2022"],
        width: "w-full md:w-[70%]",
        align: "justify-center",
        speed: 0.85,
    },
];

// 3. Update ProjectCard props to use the 'Project' type instead of 'any'
const ProjectCard = ({
    project,
    index,
}: {
    project: Project;
    index: number;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal Animation
            gsap.fromTo(
                revealRef.current,
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.5,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                    },
                },
            );

            // Parallax
            gsap.to(imageRef.current, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const projectNumber = String(index + 1).padStart(2, "0");

    return (
        <div
            ref={containerRef}
            className={`flex w-full mb-32 md:mb-64 ${project.align}`}>
            <div className={`${project.width} group`}>
                <div
                    ref={revealRef}
                    className="relative overflow-hidden aspect-[16/10] bg-zinc-900">
                    <img
                        ref={imageRef}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[120%] object-cover absolute top-[-10%] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4">
                        <span className="mono-text text-zinc-600 mt-1">
                            {projectNumber}
                        </span>
                        <div>
                            <h3 className="project-title leading-none">
                                {project.title}{" "}
                                <span className="font-light text-zinc-500 ml-2">
                                    | {project.description}
                                </span>
                            </h3>
                            <div className="flex gap-3 mt-3">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="tag border-zinc-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ x: 5 }}
                        className="mono-text text-[10px] border-b border-zinc-800 pb-1 hover:text-white transition-colors">
                        View Case Study
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

const WorkGrid = () => {
    return (
        <section id="work" className="px-6 md:px-12 py-20 bg-background">
            <div className="max-w-[1800px] mx-auto">
                <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-12">
                    <div className="max-w-2xl">
                        <span className="mono-text text-zinc-500 block mb-4 uppercase">
                            Selected Works 24/25
                        </span>
                        <h2 className="section-heading">
                            Crafting structural <br /> digital narratives.
                        </h2>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <p className="mono-text text-zinc-600 max-w-[240px] text-right">
                            Focused on high-fidelity visual systems and motion.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkGrid;
