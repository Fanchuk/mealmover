import { AboutHero } from "@/src/features/about/components/AboutHero";
import { WhyBest } from "@/src/features/about/components/WhyBest";
import { HowItWorks } from "@/src/features/about/components/HowItWorks";
import { OurTeam } from "@/src/features/about/components/OurTeam";
import { TrustedPartners } from "@/src/features/about/components/TrustedPartners";
import { CustomerSay } from "@/src/features/about/components/CustomerSay";
import { AboutFaq } from "@/src/features/about/components/AboutFaq";
import { OrderCta } from "@/src/features/about/components/OrderCta";
import { ScrollReveal } from "@/src/components/ScrollReveal";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ScrollReveal><WhyBest /></ScrollReveal>
      <ScrollReveal><HowItWorks /></ScrollReveal>
      <ScrollReveal><OurTeam /></ScrollReveal>
      <ScrollReveal><TrustedPartners /></ScrollReveal>
      <ScrollReveal><CustomerSay /></ScrollReveal>
      <ScrollReveal><AboutFaq /></ScrollReveal>
      <ScrollReveal><OrderCta /></ScrollReveal>
    </>
  );
}