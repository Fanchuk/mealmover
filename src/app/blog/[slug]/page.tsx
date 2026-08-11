import { notFound } from "next/navigation";
import { getPostDetail, getAdjacentPosts, getRelatedPosts, getComments } from "@/src/features/blog/services/postDetailApi";
import { BlogDetailContent } from "@/src/features/blog/components/BlogDetailContent";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postId = Number(slug);

  if (isNaN(postId)) notFound();

  const post = await getPostDetail(postId);
  if (!post) notFound();

  const [{ prevId, nextId }, related, comments] = await Promise.all([
    getAdjacentPosts(postId),
    getRelatedPosts(post.tags, postId),
    getComments(postId),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    articleBody: post.body,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogDetailContent
        post={post}
        prevId={prevId}
        nextId={nextId}
        related={related}
        comments={comments}
      />
    </>
  );
}