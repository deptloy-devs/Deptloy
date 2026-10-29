/**
 * The email a visitor types in the box during a call with Dep. It goes to Dep
 * as a note, so only a plain address gets through: no spaces, brackets or quotes.
 */
const ADDRESS = /^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/;
/** Same limit as a call request's email. */
const MAX_LENGTH = 120;

/** The cleaned-up address, or null if it isn't one. */
export function readTypedEmail(input: string): string | null {
  const email = input.trim().toLowerCase();
  return email.length <= MAX_LENGTH && ADDRESS.test(email) ? email : null;
}
