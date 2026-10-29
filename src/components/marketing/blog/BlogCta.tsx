import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** The calm "book a call" box at the end of the blog and of every post. */
export function BlogCta() {
  return (
    <div className="bl-cta">
      <div>
        <h2>Want this working in your business?</h2>
        <p>Tell us how your business runs. On a 30-minute call, we&apos;ll show you where AI could save you time.</p>
      </div>
      <div className="bl-cta-buttons">
        <Link className="btn" href="/contact#appointment">
          Book a call
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link className="btn ghost" href="/demo">
          Try our AI receptionist
        </Link>
      </div>
    </div>
  );
}
