import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** The calm "book a call" box at the end of the blog, every post and the About page. */
export function BlogCta() {
  return (
    <div className="bl-cta">
      <div>
        <h2>Want this working in your business?</h2>
        <p>Tell us how your business runs. We&apos;ll show you where AI and custom software could save you time.</p>
      </div>
      <div className="bl-cta-buttons">
        <Link className="btn" href="/contact#form">
          Discuss your project
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link className="btn ghost" href="/demo">
          Try our AI receptionist
        </Link>
      </div>
    </div>
  );
}
