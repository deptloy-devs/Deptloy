"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, CheckCircle2, Filter } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import type { BlogPost } from "@/types";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [activePost, setActivePost] = React.useState<BlogPost | null>(null);

  const categories = ["All", "Voice AI", "Automation", "Architecture", "Security"];

  const filteredPosts = React.useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(21,19,74,0.15)] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-mono font-medium uppercase tracking-wider text-[var(--mute)] mr-2">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            Topic:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === "All"
                ? posts.length
                : posts.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? "bg-[var(--deep)] text-white font-semibold"
                    : "bg-white text-[var(--deep)] border border-[rgba(21,19,74,0.15)] hover:bg-[var(--mist)]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-[var(--mist)] text-[var(--mute)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-[var(--mute)]">
          Showing {filteredPosts.length} of {posts.length} briefs
        </span>
      </div>

      {/* Grid of Briefs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col justify-between bg-white border border-[rgba(21,19,74,0.14)] p-6 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(87,80,168,0.14)] hover:-translate-y-1"
            style={{
              clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
            }}
          >
            <div>
              {/* Meta row */}
              <div className="flex items-center justify-between gap-2 text-xs font-mono mb-4 text-[var(--mute)]">
                <span className="font-semibold text-[var(--pur)] uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-[var(--deep)] tracking-tight leading-snug group-hover:text-[var(--or)] transition-colors">
                {post.title}
              </h3>

              {/* Summary */}
              <p className="mt-3 text-sm text-[var(--mute)] leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            {/* Bottom action */}
            <div className="mt-6 pt-4 border-t border-[rgba(21,19,74,0.1)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--mute)]">
                {post.date}
              </span>
              <button
                type="button"
                onClick={() => setActivePost(post)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--deep)] hover:text-[var(--or)] transition-colors cursor-pointer"
              >
                Read brief <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal reader for concise briefs */}
      {activePost && (
        <Modal
          isOpen={!!activePost}
          onClose={() => setActivePost(null)}
          title={activePost.title}
        >
          <div className="space-y-6 max-w-2xl">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--mute)] border-b border-[rgba(21,19,74,0.12)] pb-3">
              <span className="font-bold text-[var(--pur)] uppercase">
                {activePost.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTime}
              </span>
              <span>•</span>
              <span>{activePost.date}</span>
            </div>

            <p className="text-base font-medium text-[var(--deep)] leading-relaxed">
              {activePost.summary}
            </p>

            <div className="space-y-6">
              {activePost.content.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-display font-bold text-lg text-[var(--deep)]">
                    {section.heading}
                  </h4>
                  {section.body.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm leading-relaxed text-[var(--mute)]">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {activePost.keyTakeaways && activePost.keyTakeaways.length > 0 && (
              <div className="p-4 bg-[var(--paper)] border border-[var(--peri)] rounded-xl space-y-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--pur)]">
                  Key Takeaways
                </p>
                <ul className="space-y-1.5 text-xs text-[var(--deep)]">
                  {activePost.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3ccf91] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-[rgba(21,19,74,0.12)] flex justify-end">
              <Link href="/#contact" className="btn sm" onClick={() => setActivePost(null)}>
                Discuss Architecture with Us
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
