import { ContactHero } from "@/src/components/contact/ContactHero";
import { ContactForm } from "@/src/components/contact/ContactForm";
import { ContactMap } from "@/src/components/contact/ContactMap";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </>
  );
}