import FeatureGrid from "@/components/ui/FeatureGrid";
import Hero from "@/components/ui/Hero";

export default function LandingPage() {
    return (
        <div className="flex flex-col flex-1">
            <Hero />
            <FeatureGrid />
        </div>
    )
}
