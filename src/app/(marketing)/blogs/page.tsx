import type { Metadata } from "next";
import { BlogCta } from "@/components/marketing/blog/BlogCta";
import { PostCard } from "@/components/marketing/blog/PostCard";
import { latestPosts } from "@/lib/blog-post";
import { getAllPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog | Practical AI for Business Owners | Deptloy",
  description:
    "Plain-English reads for business owners on using AI to answer every call and take admin off your plate.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  // Newest post big, the next two beside it, the rest below: 1 + 2 + 3 when the list is full.
  const [featured, ...others] = latestPosts(getAllPosts());
  const side = others.slice(0, 2);
  const rest = others.slice(2);

  return (
    <div className="bl">
      <div className="wrap">
        <div className="bl-head">
          <span className="k">Deptloy blog</span>
          <h1>Practical AI for busy business owners.</h1>
          <p className="bl-intro">
            Short, plain-English reads on using AI to answer every call and take admin off your plate.
          </p>
        </div>

        {featured && (
          <div className={`bl-top${side.length ? "" : " solo"}`}>
            <PostCard post={featured} variant="featured" />
            {side.length > 0 && (
              <div className="bl-side">
                {side.map((post) => (
                  <PostCard key={post.slug} post={post} variant="side" />
                ))}
              </div>
            )}
          </div>
        )}

        {rest.length > 0 && (
          <div className="bl-more">
            <h2 className="bl-h2">More to read</h2>
            <div className="bl-grid" data-count={rest.length}>
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        <BlogCta />
      </div>
    </div>
  );
}
