/**
 * Robust smooth scroll to the very top of the page.
 * Uses requestAnimationFrame interpolation to avoid WebKit/Safari sticky-position aborts
 * and bypasses any CSS smooth-scroll interruptions.
 */
export function scrollToTop(durationMs?: number) {
  if (typeof window === "undefined") return;

  // Clear hash fragment from URL cleanly if present
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname);
  }

  const start =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;

  if (start <= 0) {
    window.scrollTo(0, 0);
    return;
  }

  const duration =
    durationMs ?? Math.min(650, Math.max(350, start * 0.22));
  const startTime = performance.now();
  const html = document.documentElement;
  const originalScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };

  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchmove", cancel, { passive: true, once: true });

  // Smooth ease-out quartic
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  function step(now: number) {
    if (cancelled) {
      html.style.scrollBehavior = originalScrollBehavior;
      return;
    }

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutQuart(progress);
    const currentY = Math.round(start * (1 - easeProgress));

    window.scrollTo(0, currentY);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      html.style.scrollBehavior = originalScrollBehavior;
    }
  }

  requestAnimationFrame(step);
}
