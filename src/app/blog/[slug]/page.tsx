import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/src/features/blog/components/BlogDetailContent";
import { BlogDetailSidebar } from "@/src/features/blog/components/BlogDetailSidebar";
import { getBlogPostById, getBlogPostComments, getAdjacentPosts, getPopularBlogPosts, getBlogTags, getBlogGalleryImages } from "@/src/features/blog/queries";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = Number(slug);
  if (isNaN(id)) notFound();

  const [post, comments, adjacent, popular, tags, gallery] = await Promise.all([
    getBlogPostById(id),
    getBlogPostComments(id),
    getAdjacentPosts(id),
    getPopularBlogPosts(),
    getBlogTags(),
    getBlogGalleryImages(),
  ]);

  if (!post) notFound();

  return (
    <section className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <BlogDetailContent post={post} comments={comments} adjacent={adjacent} />
        <BlogDetailSidebar popular={popular} tags={tags} gallery={gallery} />
      </div>
    </section>
  );
}