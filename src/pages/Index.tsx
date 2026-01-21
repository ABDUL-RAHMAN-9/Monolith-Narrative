import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import StatusBadge from "@/components/StatusBadge";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-background selection:bg-white selection:text-black">
                {/* Fixed UI Elements (High Z-Index) */}
                <ScrollProgress />
                <StatusBadge />
                <Header />

                {/* Main Content Sections */}
                <main>
                    <Hero />
                    <WorkGrid />
                    <About />
                </main>

                {/* Closing Section */}
                <Footer />
            </div>
        </SmoothScroll>
    );
};

export default Index;
