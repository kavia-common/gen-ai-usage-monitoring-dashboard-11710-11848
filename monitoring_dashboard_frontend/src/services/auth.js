const STORAGE_KEY = 'md_auth_session';
const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

/**
 * PUBLIC_INTERFACE
 * generateMockToken creates a mock token and 8h expiry for the given email.
 */
export function generateMockToken(email) {
  const now = Date.now();
  const expiresAt = now + EIGHT_HOURS_MS;
  const token = btoa(`${email}:${now}`);
  return { token, expiresAt };
}

/**
 * PUBLIC_INTERFACE
 * persistSession saves the session to localStorage.
 */
export function persistSession(session) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore storage errors
  }
}

/**
 * PUBLIC_INTERFACE
 * restoreSession reads session from localStorage.
 */
export function restoreSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * isSessionValid ensures expiry not passed.
 */
export function isSessionValid(session) {
  return session && session.expiresAt && Date.now() < Number(session.expiresAt);
}

/**
 * PUBLIC_INTERFACE
 * clearSession removes stored session.
 */
export function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
