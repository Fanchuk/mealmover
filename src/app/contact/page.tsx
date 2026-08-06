import { ContactHero } from "@/src/features/contact/components/ContactHero";
import { ContactForm } from "@/src/features/contact/components/ContactForm";
import { ContactMap } from "@/src/features/contact/components/ContactMap";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </>
  );
}