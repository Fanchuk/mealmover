import { BlogDetailContent } from "@/src/components/blog/BlogDetailContent";
import { BlogDetailSidebar } from "@/src/components/blog/BlogDetailSidebar";

export default function BlogDetailPage() {
  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <BlogDetailContent />
        <BlogDetailSidebar />
      </div>
    </section>
  );
}