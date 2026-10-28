/**
 * Which tab a key moves to in a row of tabs: arrows step (and wrap around),
 * Home and End jump to the ends. Null for any other key.
 */
export function tabKeyTarget(key: string, current: number, count: number): number | null {
  switch (key) {
    case "ArrowRight":
      return (current + 1) % count;
    case "ArrowLeft":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
