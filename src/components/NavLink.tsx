import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// We "Omit" children from the original props so we can redefine it strictly as ReactNode
interface NavLinkCompatProps extends Omit<
    NavLinkProps,
    "className" | "children"
> {
    className?: string;
    activeClassName?: string;
    pendingClassName?: string;
    children?: ReactNode; // Strictly define as ReactNode to fix Error 2322
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
    (
        {
            className,
            activeClassName,
            pendingClassName,
            to,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <RouterNavLink
                ref={ref}
                to={to}
                className={({ isActive, isPending }) =>
                    cn(
                        "nav-link relative group py-2 transition-opacity duration-500 flex items-center gap-2",
                        isActive ? "text-foreground" : "text-zinc-500",
                        className,
                        isActive && activeClassName,
                        isPending && pendingClassName,
                    )
                }
                {...props}>
                {({ isActive }) => (
                    <>
                        {/* ACTIVE INDICATOR */}
                        {isActive && (
                            <motion.span
                                layoutId="navDot"
                                className="w-1 h-1 bg-foreground rounded-full"
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            />
                        )}

                        {/* TEXT CONTAINER */}
                        <span className="relative overflow-hidden">
                            {children}

                            {/* HOVER LINE - Changed h-[1px] to h-px to fix Tailwind warning */}
                            <span className="absolute bottom-0 left-0 w-full h-px bg-foreground translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        </span>
                    </>
                )}
            </RouterNavLink>
        );
    },
);

NavLink.displayName = "NavLink";

export { NavLink };
