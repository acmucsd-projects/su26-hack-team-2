import FeatureGrid from "@/components/ui/FeatureGrid";
import Hero from "@/components/ui/Hero";
import Navbar from "@/components/ui/Navbar";

export default function LandingPage() {
    return (
        <div className="flex flex-col flex-1">
            <Navbar variant="landing" />
            <Hero />
            <FeatureGrid />
        </div>
    )
}