import { AboutHero } from "@/src/features/about/components/AboutHero";
import { WhyBest } from "@/src/features/about/components/WhyBest";
import { HowItWorks } from "@/src/features/about/components/HowItWorks";
import { OurTeam } from "@/src/features/about/components/OurTeam";
import { TrustedPartners } from "@/src/features/about/components/TrustedPartners";
import { CustomerSay } from "@/src/features/about/components/CustomerSay";
import { AboutFaq } from "@/src/features/about/components/AboutFaq";
import { OrderCta } from "@/src/features/about/components/OrderCta";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhyBest />
      <HowItWorks />
      <OurTeam />
      <TrustedPartners />
      <CustomerSay />
      <AboutFaq />
      <OrderCta />
    </>
  );
}