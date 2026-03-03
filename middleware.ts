import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/projetos/novo", "/perfil"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected  = PROTECTED.some((r) => pathname.startsWith(r));

  if (!isProtected) return NextResponse.next();

  // Verifica presença do token via cookie (opcional) ou deixa o client redirecionar
  // O redirect real é feito no useEffect de cada página protegida
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projetos/novo"],
};
