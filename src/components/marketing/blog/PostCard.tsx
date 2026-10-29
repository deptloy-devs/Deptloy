import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPostDate, readMinutes, type BlogPost } from "@/lib/blog-post";
import { BlogCover } from "./BlogCover";

/** Topic, date and reading time, shown on cards and at the top of a post. */
export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="bl-meta">
      <span className="bl-topic">{post.category}</span>
      <span className="bl-when">
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        <span aria-hidden="true"> · </span>
        {readMinutes(post)} min read
      </span>
    </p>
  );
}

/**
 * A post in a list. "featured" is the big newest post, "side" the two beside it,
 * "grid" the rest. The whole card is clickable through the title link.
 */
export function PostCard({ post, variant = "grid" }: { post: BlogPost; variant?: "featured" | "side" | "grid" }) {
  const featured = variant === "featured";
  const Title = featured ? "h2" : "h3";
  return (
    <article className={`bl-card ${variant}`}>
      <BlogCover category={post.category} slug={post.slug} size={featured ? "large" : "card"} badge={featured ? "Latest post" : undefined} />
      <div className="bl-card-body">
        <PostMeta post={post} />
        <Title className="bl-card-title">
          <Link href={`/blogs/${post.slug}`} className="bl-card-link">
            {post.title}
          </Link>
        </Title>
        <p className="bl-card-summary">{post.summary}</p>
        <span className="bl-read" aria-hidden="true">
          Read the post
          <ArrowRight />
        </span>
      </div>
    </article>
  );
}
