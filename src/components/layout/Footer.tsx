import Link from "next/link";
import { ArrowRight } from "lucide-react";

const QUICK_LINKS = ["Home","About","Restaurants","Blog","Contact"];
const COMPANY = [{ label:"Why MealMover", href:"#"},{ label:"Partner With Us", href:"#"},{ label:"FAQs", href:"#"}];
const SOCIAL = ["Instagram","Twitter","Facebook","LinkedIn"];

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-10 lg:gap-12">

          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex items-center gap-3">
              <img src="/Frame 1000002737.svg" alt="MealMover" className="h-12 w-auto" />
            </div>
            <p className="font-heading font-normal text-[16px] leading-[150%] text-neutral-700 max-w-[260px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
              <div>
                <h4 className="font-heading font-bold text-[20px] lg:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800 mb-4">Quick Links</h4>
                <ul className="flex flex-col gap-3">
                  {QUICK_LINKS.map((l) => (
                    <li key={l}><Link href={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="font-heading font-medium text-[16px] text-[#EF5B5B] hover:text-[#CD424E]">{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold text-[20px] lg:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800 mb-4">Company</h4>
                <ul className="flex flex-col gap-3">
                  {COMPANY.map((c) => (
                    <li key={c.label}><Link href={c.href} className="font-heading font-medium text-[16px] text-[#EF5B5B] hover:text-[#CD424E]">{c.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold text-[20px] lg:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800 mb-4">Social</h4>
                <ul className="flex flex-col gap-3">
                  {SOCIAL.map((s) => (
                    <li key={s}><Link href="#" className="font-heading font-medium text-[16px] text-[#EF5B5B] hover:text-[#CD424E]">{s}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] bg-neutral-200 self-stretch mx-auto" />

          <div className="lg:min-w-[380px]">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-heading font-bold text-[20px] lg:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">Get in Touch</h4>
                <p className="font-heading font-light text-[16px] leading-[150%] text-neutral-700 mt-1">Question or feedback?<br />We'd love to hear from you</p>
              </div>
              <div className="flex gap-2">
                <div className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center overflow-hidden">
                  <img src="/Frame 1000002736.png" alt="Play Store" className="w-5 h-5 object-contain" />
                </div>
                <div className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center overflow-hidden">
                  <img src="/Frame 1000002735.png" alt="App Store" className="w-5 h-5 object-contain" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center bg-neutral-100 border border-neutral-200 rounded-[50px] h-[60px] px-5 gap-3">
              <input type="email" placeholder="Enter your Email..." className="flex-1 min-w-0 bg-transparent outline-none font-heading font-normal text-[16px] text-neutral-700 placeholder:text-neutral-400" />
              <button className="w-10 h-10 rounded-full bg-[#EF5B5B] flex items-center justify-center text-white hover:bg-[#CD424E] transition-colors flex-shrink-0">
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 lg:gap-6">
              {["Privacy policy","Terms of service","Shipping policy","Return policy"].map((p) => (
                <Link key={p} href="#" className="font-heading font-light text-[14px] text-neutral-500 hover:text-neutral-700">{p}</Link>
              ))}
            </div>

            <p className="mt-4 font-heading font-light text-[14px] text-neutral-400">
              © 2024 MealMover | MealMover is a trademark of PT Food Bisa. All rights reserved
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}