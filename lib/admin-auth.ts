/**
 * Auth admin minimaliste basée sur localStorage.
 * Pour la démo uniquement. Pour la prod il faut une vraie auth (NextAuth, Clerk, Supabase Auth…).
 */

const KEY = "ds_admin_authed";

// Mot de passe codé en dur — à remplacer par une vraie auth côté serveur.
// Pour le moment : "admin2026"
const ADMIN_PASSWORD = "admin2026";

export function login(username: string, password: string): boolean {
  if (typeof window === "undefined") return false;
  if (password === ADMIN_PASSWORD && username.trim().length > 0) {
    localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}
