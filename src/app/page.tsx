import { HeroSection } from "../components/home/HeroSection";
import { WhySection } from "../components/home/WhySection";
import { FoodCategoriesSection } from "../components/home/FoodCategoriesSection";
import { PromoSection } from "../components/home/PromoSection";
import { PartnerSection } from "../components/home/PartnerSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { FaqSection } from "../components/home/FaqSection";
import { CitiesSection } from "../components/home/CitiesSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhySection />
      <FoodCategoriesSection />
      <PromoSection />
      <PartnerSection />
      <TestimonialsSection />
      <FaqSection />
      <CitiesSection />
    </main>
  );
}