import { ContactHero } from "@/src/features/contact/components/ContactHero";
import { ContactForm } from "@/src/features/contact/components/ContactForm";
import { ContactMap } from "@/src/features/contact/components/ContactMap";
import { ScrollReveal } from "@/src/components/ScrollReveal";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ScrollReveal><ContactForm /></ScrollReveal>
      <ScrollReveal><ContactMap /></ScrollReveal>
    </>
  );
}