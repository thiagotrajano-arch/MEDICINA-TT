import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/entrar";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next({ request });

  if (pathname === LOGIN_PATH || pathname === `${LOGIN_PATH}/`) {
    return response;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return redirectToLogin(request, "config");
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirectToLogin(request, "session");
  }

  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Codex-Privacy", "owner-session-required");
  return response;
}

function redirectToLogin(request: NextRequest, reason: string) {
  const login = new URL(LOGIN_PATH, request.url);
  login.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  login.searchParams.set("reason", reason);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:css|js|map|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf)$).*)",
  ],
};
