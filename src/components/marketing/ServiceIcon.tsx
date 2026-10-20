import { Bot, Zap, BarChart3, Code2, type LucideProps } from "lucide-react";
import type { ServiceSlug } from "@/types";

const icons = {
  "ai-receptionist": Bot,
  automation: Zap,
  crm: BarChart3,
  development: Code2,
} satisfies Record<ServiceSlug, React.ComponentType<LucideProps>>;

/** One icon per service, used everywhere services appear (nav, cards, footer). */
export function ServiceIcon({ slug, ...props }: { slug: ServiceSlug } & LucideProps) {
  const Icon = icons[slug];
  return <Icon aria-hidden="true" {...props} />;
}
