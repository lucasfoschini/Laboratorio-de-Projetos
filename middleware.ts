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

  // Verifica as permissões com base no Cargo presente do payload JWT
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    // Apenas Professores podem abrir chamados nessas telas:
    const requiresProfessor = [
      /^\/projetos\/novo$/,
      /^\/projetos\/[^/]+\/editar$/,
      /^\/publicacoes\/[^/]+\/editar$/,
    ];

    if (payload.role !== "PROFESSOR" && requiresProfessor.some((r) => r.test(pathname))) {
      const deniedUrl = new URL("/acesso-negado", request.url);
      return NextResponse.redirect(deniedUrl);
    }
  } catch (err) {
    // Falha silenciosa no middleware para parsing JWT malformado
    // O backend negaria a requisição de qualquer forma
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
