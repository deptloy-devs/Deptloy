"use client";

import * as React from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import type { BlogPost } from "@/types";

interface BlogListProps {
  posts: BlogPost[];
}

const categoryVariants: Record<
  BlogPost["category"],
  "brand" | "accent" | "success" | "warning"
> = {
  "Voice AI": "brand",
  Automation: "accent",
  Architecture: "success",
  Security: "warning",
};

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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg-subtle mr-2">
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
                className={cn(
                  "cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150",
                  isSelected
                    ? "bg-brand-600 text-white shadow-sm font-semibold"
                    : "border border-line bg-card/60 text-fg-soft hover:bg-raised hover:text-fg"
                )}
              >
                {cat}
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-raised text-fg-muted"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-fg-muted hidden sm:block">
          Showing <span className="font-semibold text-fg">{filteredPosts.length}</span> curated {filteredPosts.length === 1 ? "brief" : "briefs"}
        </p>
      </div>

      {/* Grid of Minimal Insight Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => {
          const variant = categoryVariants[post.category];

          return (
            <Card
              key={post.slug}
              as="article"
              interactive
              padding="lg"
              className="flex flex-col justify-between group cursor-pointer transition-all duration-200"
              onClick={() => setActivePost(post)}
            >
              <div>
                {/* Meta Row: Category Badge + Date + Read Time */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant={variant} size="sm" dot>
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-caption text-fg-subtle">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="mt-4 font-display text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-brand-300 sm:text-xl">
                  {post.title}
                </h2>

                {/* Excerpt / Summary */}
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                  {post.summary}
                </p>

                {/* Key Takeaways Box */}
                <div className="mt-5 rounded-card border border-line bg-surface/70 p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-fg-subtle flex items-center gap-1 mb-2">
                    <Sparkles className="h-3 w-3 text-brand-400" aria-hidden="true" />
                    Key Takeaways
                  </p>
                  <ul className="space-y-1.5">
                    {post.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-fg-soft leading-snug"
                      >
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-medium text-brand-300 group-hover:text-brand-200 inline-flex items-center gap-1">
                  Read complete brief
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="text-[11px] text-fg-subtle">Instant breakdown</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Accessible Reading Modal */}
      {activePost && (
        <Modal
          isOpen={Boolean(activePost)}
          onClose={() => setActivePost(null)}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={categoryVariants[activePost.category]} size="sm" dot>
                  {activePost.category}
                </Badge>
                <span className="text-xs text-fg-subtle">•</span>
                <span className="text-xs text-fg-subtle">{activePost.date}</span>
                <span className="text-xs text-fg-subtle">•</span>
                <span className="text-xs text-fg-subtle">{activePost.readTime}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-fg">
                {activePost.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-fg-soft">
                {activePost.summary}
              </p>
            </div>

            {/* Actionable Takeaways Strip */}
            <div className="rounded-panel border border-brand-400/25 bg-brand-500/[0.06] p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="h-4 w-4 text-brand-400" aria-hidden="true" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  Key Architectural Takeaways
                </h3>
              </div>
              <ul className="space-y-2">
                {activePost.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-fg-soft">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" aria-hidden="true" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Structured Sections */}
            <div className="space-y-6 border-t border-line pt-6">
              {activePost.content.map((sec, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h2 className="font-display text-lg font-semibold text-fg">
                    {sec.heading}
                  </h2>
                  {sec.body.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm leading-relaxed text-fg-muted">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer action */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-5">
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="cursor-pointer text-xs font-medium text-fg-muted hover:text-fg transition-colors"
              >
                Close brief
              </button>
              <div className="flex items-center gap-3">
                <Button href="/contact" size="sm" variant="primary">
                  Discuss Implementation
                </Button>
                <Button href="/demo" size="sm" variant="ghost">
                  Try AI Demo
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
