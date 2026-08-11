"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { sendContactMessage, type ContactState } from "../services/contactAction";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, { ok: false } as ContactState);

  useEffect(() => {
    if (state.ok) toast.success("Message sent! Check your inbox.");
    else if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="rounded-[40px] lg:rounded-[60px] shadow-[0_2px_50px_10px_rgba(0,0,0,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-[auto_1fr]">
          <div className="relative bg-[#EF5B5B] rounded-[40px] lg:rounded-[50px] p-8 lg:p-10 flex flex-col gap-8 lg:w-[460px] xl:w-[510px] overflow-hidden">
            <div className="absolute bottom-[-1px] left-0 w-[180px] h-[180px] lg:w-[274px] lg:h-[258px] pointer-events-none z-0">
              <Image src="/Rectangle 692.svg" alt="" fill className="object-contain object-bottom-left" />
            </div>
            <div className="absolute top-0 right-0 w-[140px] h-[140px] lg:w-[200px] lg:h-[200px] pointer-events-none z-0">
              <Image src="/Rectangle 693.svg" alt="" fill className="object-contain object-top-right" />
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] w-[140px] h-[140px] lg:w-[231px] lg:h-[196px] pointer-events-none z-0">
              <Image src="/Vector.svg" alt="" fill className="object-contain object-bottom-right" />
            </div>

            <div className="relative z-10">
              <h2 className="font-heading font-bold text-[24px] sm:text-[28px] lg:text-[31px] leading-[132%] text-white mb-4">
                Contact Information
              </h2>
              <p className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white/90 max-w-[320px]">
                Consult your project and get the best solution for your business with our creative teams.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-6 mt-2">
              <div className="flex items-center gap-4">
                <Image src="/Iconography - Caesarzkn.svg" alt="" width={24} height={24} className="object-contain flex-shrink-0" />
                <span className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white">Malang, Indonesia</span>
              </div>
              <a href="tel:+62345188368" className="flex items-center gap-4">
                <Image src="/Iconography - Caesarzkn (1).svg" alt="" width={24} height={24} className="object-contain flex-shrink-0" />
                <span className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white">+62345188368</span>
              </a>
              <a href="mailto:info@mealmover.com" className="flex items-center gap-4">
                <Image src="/Group (1).svg" alt="" width={24} height={24} className="object-contain flex-shrink-0 brightness-0 invert" />
                <span className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white">info@mealmover.com</span>
              </a>
            </div>

            <div className="relative z-10 flex gap-4 mt-auto pt-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
                <Image src="/Facebook (2).svg" alt="Facebook" width={20} height={20} className="object-contain" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
                <Image src="/Instagram (2).svg" alt="Instagram" width={20} height={20} className="object-contain" />
              </a>
              <a href="https://wa.me/62345188368" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors">
                <Image src="/WhatsApp (2).svg" alt="WhatsApp" width={20} height={20} className="object-contain" />
              </a>
            </div>
          </div>

          <form action={formAction} className="p-8 lg:p-12 flex flex-col gap-6 bg-white">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-heading font-bold text-[14px] text-neutral-800">Name</label>
                <input type="text" name="name" required placeholder="Input Full Name" className="bg-[#F8F9FA] border border-neutral-100 rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-heading font-bold text-[14px] text-neutral-800">Email</label>
                <input type="email" name="email" required placeholder="Input Email" className="bg-[#F8F9FA] border border-neutral-100 rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-heading font-bold text-[14px] text-neutral-800">Subject</label>
              <input type="text" name="subject" required placeholder="Input Subject" className="bg-[#F8F9FA] border border-neutral-100 rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-heading font-bold text-[14px] text-neutral-800">Message</label>
              <textarea name="message" required placeholder="Input Message" className="bg-[#F8F9FA] border border-neutral-100 rounded-[24px] p-5 h-[160px] outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400 resize-none" />
            </div>

            <button type="submit" disabled={pending} className="self-start mt-2 flex items-center gap-3 bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[56px] pl-8 pr-3 font-heading font-medium text-[16px] lg:text-[18px] text-white disabled:opacity-70">
              {pending ? "Sending..." : "Send Message"}
              <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <ArrowRight size={18} className="text-[#EF5B5B]" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}