import Image from "next/image";
import { FloatingShapes } from "@/src/components/FloatingShapes";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export function WhySection({ features }: { features: Feature[] }) {
  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <FloatingShapes positions={[
        { top: "15%", right: "5%" },
        { top: "70%", left: "10%" },
        { top: "40%", right: "20%" },
      ]} />
      <Image src="/015-spinach (1).png" alt="" width={150} height={150} className="absolute right-[-40px] sm:right-[-20px] top-[30%] lg:top-[40%] w-[100px] sm:w-[150px] lg:w-[180px] h-auto object-contain z-10 drop-shadow-lg" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-20">
        <div className="relative order-2 lg:order-1 flex justify-center">
          <Image src="/Layer_9.svg" alt="Why MealMover" width={500} height={500} className="w-full max-w-[500px]" />
        </div>
        <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2">
          <span className="font-heading font-bold text-[16px] sm:text-[20px] leading-[150%] tracking-[0.1em] text-[#EF5B5B] uppercase">Why Choose Us</span>
          <h2 className="font-heading font-bold text-[38px] sm:text-[48px] lg:text-[61px] leading-[115%] lg:leading-[123%] tracking-[0.01em] text-neutral-800">Why We Are the Best</h2>
          <p className="font-heading font-normal text-[16px] sm:text-[20px] leading-[150%] tracking-[0.02em] text-neutral-700">
            &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin convallis enim sed vehicula.&rdquo;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.id} className="flex items-start gap-4">
                <div className="w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] rounded-full bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] flex items-center justify-center flex-shrink-0">
                  <Image src={f.icon} alt="" width={40} height={40} className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[20px] lg:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">{f.title}</h3>
                  <p className="font-heading font-normal text-[14px] lg:text-[16px] leading-[163%] tracking-[0.02em] text-neutral-700">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}