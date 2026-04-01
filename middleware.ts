import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATTERNS = [
  /^\/dashboard(\/.*)?$/,
  /^\/perfil(\/.*)?$/,
  /^\/projetos\/novo$/,
  /^\/projetos\/[^/]+\/editar$/,
  /^\/publicacoes\/[^/]+\/editar$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATTERNS.some((r) => r.test(pathname));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("labativo_access_token")?.value;
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/perfil/:path*",
    "/projetos/novo",
    "/projetos/:id/editar",
    "/publicacoes/:id/editar",
  ],
};
