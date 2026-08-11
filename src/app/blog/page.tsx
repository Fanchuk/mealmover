import { getPosts, getPopularPosts, getAllTags } from "@/src/features/blog/services/blogApi";
import { BlogContent } from "@/src/features/blog/components/BlogContent";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const sp = await searchParams;

  const [posts, popular, tags] = await Promise.all([
    getPosts({ q: sp.q, tag: sp.tag }),
    getPopularPosts(),
    getAllTags(),
  ]);

  return (
    <BlogContent
      posts={posts}
      popular={popular}
      tags={tags}
      activeQ={sp.q ?? ""}
      activeTag={sp.tag ?? ""}
    />
  );
}