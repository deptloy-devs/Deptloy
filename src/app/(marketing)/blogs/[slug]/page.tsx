import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { BlogCover } from "@/components/marketing/blog/BlogCover";
import { BlogCta } from "@/components/marketing/blog/BlogCta";
import { PostCard, PostMeta } from "@/components/marketing/blog/PostCard";
import { headingId, relatedPosts } from "@/lib/blog-post";
import { getAllPosts, getPost } from "@/lib/blogs";

interface PageProps { params: Promise<{ slug: string }> }

export const instant = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found | Deptloy" };
  return {
    title: `${post.title} | Deptloy Blog`,
    description: post.summary,
    alternates: { canonical: `/blogs/${post.slug}` },
    // A page's openGraph replaces the site's, so the share image is repeated here.
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/blogs/${post.slug}`,
      siteName: "Deptloy",
      locale: "en_US",
      publishedTime: post.publishedAt,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const sections = post.content.map((section) => ({ ...section, id: headingId(section.heading) }));
  const related = relatedPosts(post, posts);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    mainEntityOfPage: `https://deptloy.com/blogs/${post.slug}`,
    author: { "@type": "Organization", name: "Deptloy", url: "https://deptloy.com" },
    publisher: { "@type": "Organization", name: "Deptloy", url: "https://deptloy.com" },
  };

  return (
    <div className="bl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="wrap">
        <Link href="/blogs" className="bl-back">
          <ArrowLeft aria-hidden="true" />
          All posts
        </Link>

        <div className="bl-post-head">
          <PostMeta post={post} />
          <h1>{post.title}</h1>
          <p className="bl-intro">{post.summary}</p>
        </div>
        <BlogCover category={post.category} slug={post.slug} size="large" />

        <div className="bl-layout">
          <article className="bl-article">
            <div className="bl-takeaways">
              <p className="bl-label">Key takeaways</p>
              <ul>
                {post.keyTakeaways.map((point) => (
                  <li key={point}>
                    <CheckCircle2 aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {sections.map((section) => (
              <div key={section.id} className="bl-section">
                <h2 id={section.id}>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul className="bl-points">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

          <aside className="bl-aside">
            <div className="bl-toc">
              <p className="bl-label">In this post</p>
              <ol>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bl-side-cta">
              <p>Want this for your business?</p>
              <Link className="btn sm" href="/contact#appointment">
                Book a call
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        <BlogCta />

        {related.length > 0 && (
          <div className="bl-more">
            <h2 className="bl-h2">Keep reading</h2>
            <div className="bl-grid" data-count={related.length}>
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
