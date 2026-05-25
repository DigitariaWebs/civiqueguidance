import { createClient } from "./supabase/browser";

/**
 * Auth admin via Supabase Auth (email + password).
 * Pour créer le compte admin la première fois :
 *   1. Va dans https://supabase.com/dashboard/project/kfsublmmlcxqnaxoojpy/auth/users
 *   2. Clique "Add user" → "Create new user"
 *   3. Renseigne l'email service.horizon224@gmail.com + un mot de passe
 *   4. Coche "Auto Confirm User" pour activer le compte directement
 */

export async function login(
  email: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function logout(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
