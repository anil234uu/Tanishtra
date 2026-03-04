import { HeroSection } from "@/components/Home/HeroSection";
import { TrustedLogos } from "@/components/Home/TrustedLogos";
import { SocialTicker } from "@/components/Home/SocialTicker";
import { CategoryGrid } from "@/components/Home/CategoryGrid";
import { Bestsellers } from "@/components/Home/Bestsellers";
import { BrandStory } from "@/components/Home/BrandStory";
import { TitanSeries } from "@/components/Home/TitanSeries";
import { CraftsmanshipProcess } from "@/components/Home/CraftsmanshipProcess";
import { TrustFeatures } from "@/components/Home/TrustFeatures";
import { CustomerReviews } from "@/components/Home/CustomerReviews";
import { NewArrivals } from "@/components/Home/NewArrivals";
import { InstagramStrip } from "@/components/Home/InstagramStrip";
import { NewsletterCapture } from "@/components/Home/NewsletterCapture";

export const metadata = {
  title: "Tanishtra | Chains & Rings for the Modern Man",
  description: "Mumbai-based men's luxury accessories. Premium chains, lockets, rings, and bracelets engineered for presence and built for everyday dominance.",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-background overflow-x-hidden">
      <HeroSection />
      <TrustedLogos />
      <SocialTicker />
      <CategoryGrid />
      <Bestsellers />
      <BrandStory />
      <TitanSeries />
      <CraftsmanshipProcess />
      <TrustFeatures />
      <CustomerReviews />
      <NewArrivals />
      <InstagramStrip />
      <NewsletterCapture />
    </div>
  );
}
