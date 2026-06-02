import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Pas de Supabase configuré → on laisse passer (le site marche en mode "sans backend")
  if (!url || !key) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // Protège /dashboard (admin) : si pas connecté → redirige vers /admin/login
    if (path.startsWith("/dashboard") && !user) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/admin/login";
      return NextResponse.redirect(redirect);
    }

    // Protège /compte (client) : si pas connecté → /compte/connexion
    // (sauf les pages connexion + inscription elles-mêmes)
    if (
      path.startsWith("/compte") &&
      !user &&
      !path.startsWith("/compte/connexion") &&
      !path.startsWith("/compte/inscription")
    ) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/compte/connexion";
      return NextResponse.redirect(redirect);
    }

    // Déjà connecté + sur /admin/login → /dashboard
    if (path === "/admin/login" && user) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/dashboard";
      return NextResponse.redirect(redirect);
    }

    // Déjà connecté + sur /compte/connexion ou /compte/inscription → /compte
    if (
      (path === "/compte/connexion" || path === "/compte/inscription") &&
      user
    ) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/compte";
      return NextResponse.redirect(redirect);
    }
  } catch (err) {
    // Sécurité : si Supabase plante (clé invalide, réseau, etc.) on ne casse pas le site
    console.error("[middleware] Supabase auth check failed:", err);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
