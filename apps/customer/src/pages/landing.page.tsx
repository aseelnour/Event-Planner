import { Navbar } from "@/widget/navbar";
import { Hero } from "@/widget/hero";
import { Features } from "@/widget/features";
import { HowItWorks } from "@/widget/how-it-works";
import { Pricing } from "@/widget/pricing";
import { VenueOwner } from "@/widget/venue-owner";
import { CTA } from "@/components/cta";
import { Footer } from "@/widget/footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <VenueOwner />
      <CTA />
      <Footer />
    </div>
  );
};