import { AboutHero } from "@/src/components/about/AboutHero";
import { WhyBest } from "@/src/components/about/WhyBest";
import { HowItWorks } from "@/src/components/about/HowItWorks";
import { OurTeam } from "@/src/components/about/OurTeam";
import { TrustedPartners } from "@/src/components/about/TrustedPartners";
import { CustomerSay } from "@/src/components/about/CustomerSay";
import { AboutFaq } from "@/src/components/about/AboutFaq";
import { OrderCta } from "@/src/components/about/OrderCta";

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