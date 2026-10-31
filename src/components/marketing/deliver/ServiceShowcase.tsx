"use client";

import type * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { useTabs } from "./useTabs";

export type ShowcaseItem = {
  slug: string;
  title: string;
  href: string;
  promise: string;
  forWho?: string;
  included: string[];
  timeline?: string;
  color: string;
  screen: React.ReactNode;
};

/** The four services, one at a time: what's included on the left, an example screen on the right. */
export function ServiceShowcase({ items }: { items: ShowcaseItem[] }) {
  const { tab, panel } = useTabs(
    "service",
    items.map((item) => item.slug),
    { followHash: true },
  );

  return (
    <>
      <div className="wd-tabs" role="tablist" aria-label="Our services">
        {items.map((item, i) => (
          <button key={item.slug} type="button" className="wd-tab" {...tab(i)}>
            <span className="wd-dot" style={{ "--c": item.color } as React.CSSProperties} aria-hidden="true" />
            {item.title}
          </button>
        ))}
      </div>

      {items.map((item, i) => (
        <div key={item.slug} className="wd-panel wd-surface" {...panel(i)}>
          <div>
            <h3>{item.title}</h3>
            <p className="wd-promise">{item.promise}</p>
            <ul className="wd-list">
              {item.included.map((point) => (
                <li key={point}>
                  <Check aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            {item.timeline && (
              <p className="wd-time">
                <Clock aria-hidden="true" />
                {item.timeline}
              </p>
            )}
            <Link href={item.href} className="wd-more">
              More about {item.title}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {item.screen}
        </div>
      ))}
    </>
  );
}
