import { ArrowRight } from "lucide-react";

export function ContactForm() {
  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="rounded-[40px] lg:rounded-[60px] shadow-[0_2px_50px_10px_rgba(0,0,0,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-[auto_1fr]">
          <div className="relative bg-[#EF5B5B] rounded-[40px] lg:rounded-[50px] p-8 lg:p-10 flex flex-col gap-8 lg:w-[510px] overflow-hidden">
            <img src="/Rectangle 692.png" alt="" className="absolute bottom-0 left-0 w-28 lg:w-40 object-contain pointer-events-none" />
            <img src="/Rectangle 693.png" alt="" className="absolute top-6 right-6 w-20 lg:w-28 object-contain pointer-events-none" />
            <img src="/Vector (2).png" alt="" className="absolute bottom-8 right-8 w-16 lg:w-24 object-contain pointer-events-none opacity-60" />

            <div>
              <h2 className="font-heading font-bold text-[24px] sm:text-[28px] lg:text-[31px] leading-[132%] text-white mb-4">
                Contact Information
              </h2>
              <p className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white/80 max-w-[320px]">
                Consult your project and get the best solution for your business with our creative teams.
              </p>
            </div>

            <div className="flex flex-col gap-5 z-10">
              <div className="flex items-center gap-4">
                <img src="/Iconography - Caesarzkn.svg" alt="" className="w-6 h-6 object-contain flex-shrink-0" />
                <span className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white">Malang, Indonesia</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/Iconography - Caesarzkn (1).svg" alt="" className="w-6 h-6 object-contain flex-shrink-0" />
                <span className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white">+62345188368</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/Group (1).svg" alt="" className="w-6 h-6 object-contain flex-shrink-0 brightness-0 invert" />
                <span className="font-heading font-normal text-[16px] sm:text-[18px] leading-[150%] text-white">info@mealmover.com</span>
              </div>
            </div>

            <div className="flex gap-4 z-10">
              <button className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <img src="/Facebook (2).svg" alt="Facebook" className="w-5 h-5 object-contain" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <img src="/Instagram (2).svg" alt="Instagram" className="w-5 h-5 object-contain" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <img src="/WhatsApp (2).svg" alt="WhatsApp" className="w-5 h-5 object-contain" />
              </button>
            </div>
          </div>

          <div className="p-8 lg:p-12 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-heading font-medium text-[16px] text-neutral-800">Name</label>
                <input
                  type="text"
                  placeholder="Input Full Name"
                  className="bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-heading font-medium text-[16px] text-neutral-800">Email</label>
                <input
                  type="email"
                  placeholder="Input Email"
                  className="bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-heading font-medium text-[16px] text-neutral-800">Subject</label>
              <input
                type="text"
                placeholder="Input Full Name"
                className="bg-neutral-100 border border-neutral-200 rounded-[50px] h-[56px] px-6 outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-heading font-medium text-[16px] text-neutral-800">Message</label>
              <textarea
                placeholder="Input Message"
                className="bg-neutral-100 border border-neutral-200 rounded-[24px] p-5 h-[160px] outline-none font-heading font-normal text-[16px] text-neutral-800 placeholder:text-neutral-400 resize-none"
              />
            </div>

            <button className="self-start flex items-center gap-3 bg-[#EF5B5B] hover:bg-[#CD424E] transition-colors rounded-[50px] h-[56px] pl-8 pr-3 font-heading font-medium text-[18px] text-white">
              Send Message
              <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <ArrowRight size={16} className="text-[#EF5B5B]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}