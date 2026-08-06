import { BlogHero } from "@/src/features/blog/components/BlogHero";
import { BlogContent } from "@/src/features/blog/components/BlogContent";
import { getBlogPosts, getPopularBlogPosts, getBlogTags, getBlogGalleryImages } from "@/src/features/blog/queries";

export default async function BlogPage() {
  const [{ posts, total }, popular, tags, gallery] = await Promise.all([
    getBlogPosts(3, 0),
    getPopularBlogPosts(),
    getBlogTags(),
    getBlogGalleryImages()
  ]);

  return (
    <>
      <BlogHero />
      <BlogContent posts={posts} total={total} popular={popular} tags={tags} gallery={gallery} />
    </>
  );
}