"use client";

import * as React from "react";
import { tabKeyTarget } from "@/lib/tab-keys";

/**
 * A row of tabs with one panel showing at a time. Arrow keys, Home and End
 * move between tabs. With followHash, a link to "#<name>-<id>" opens that tab.
 */
export function useTabs(name: string, ids: string[], { followHash = false } = {}) {
  const [active, setActive] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const idList = ids.join(",");

  React.useEffect(() => {
    if (!followHash) return;
    const list = idList.split(",");
    const open = (hash: string) => {
      const i = list.findIndex((id) => hash === `#${name}-${id}`);
      if (i >= 0) setActive(i);
    };
    // Clicking a link to the tab that's already in the URL fires no hashchange, so watch clicks too.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(`a[href^="#${name}-"]`);
      if (link) open(link.getAttribute("href") ?? "");
    };
    const onHash = () => open(window.location.hash);
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, [followHash, idList, name]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = tabKeyTarget(e.key, active, ids.length);
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const tab = (i: number) => ({
    id: `${name}-${ids[i]}`,
    role: "tab" as const,
    "aria-selected": i === active,
    "aria-controls": `${name}-${ids[i]}-panel`,
    tabIndex: i === active ? 0 : -1,
    onClick: () => setActive(i),
    onKeyDown,
    ref: (el: HTMLButtonElement | null) => {
      tabs.current[i] = el;
    },
  });

  const panel = (i: number) => ({
    id: `${name}-${ids[i]}-panel`,
    role: "tabpanel" as const,
    "aria-labelledby": `${name}-${ids[i]}`,
    hidden: i !== active,
    tabIndex: 0,
  });

  return { active, setActive, tab, panel };
}
