import { BlogSidebar } from "@/src/components/blog/BlogSidebar";
import { BlogPost } from "@/src/components/blog/BlogPost";

const POSTS = [
  { image: "/Mask group (11).png", title: "Convenience at Your Doorstep: Exploring the Benefits of Order Food Delivery Apps" },
  { image: "/Mask group (14).png", title: "The Rise of Order Food Delivery Apps: Revolutionizing Dining Convenience" },
  { image: "/Mask group (16).png", title: "On-Demand Dining: Exploring the Impact of Food Delivery Apps" },
];

export function BlogContent() {
  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <BlogSidebar />

        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-bold text-[25px] tracking-[0.02em] text-[#EF5B5B] mb-6">Popular Post</h2>
          <div className="flex flex-col gap-10 lg:gap-14">
            {POSTS.map((post, i) => (
              <BlogPost key={i} {...post} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10 lg:mt-14">
            <button className="flex items-center gap-2 border border-[#EF5B5B] rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] text-[#EF5B5B] hover:bg-[#FEE9DE] transition-colors">
              <img src="/arrow-left.svg" alt="" className="w-4 h-4 object-contain" /> Prev
            </button>
            <div className="w-[120px] sm:w-[282px] h-1 rounded-[20px] bg-neutral-200 relative">
              <div className="absolute left-0 top-0 h-full w-1/3 rounded-[20px] bg-[#FFCF27]" />
            </div>
            <button className="flex items-center gap-2 border border-[#EF5B5B] rounded-[50px] h-[40px] px-6 font-heading font-medium text-[16px] text-[#EF5B5B] hover:bg-[#FEE9DE] transition-colors">
              Next <img src="/arrow-right.svg" alt="" className="w-4 h-4 object-contain" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}