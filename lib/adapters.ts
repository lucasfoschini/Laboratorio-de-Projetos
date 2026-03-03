export const adaptArea   = (a: string) => a?.toLowerCase() ?? "technology";
export const adaptStatus = (s: string) => ({ EM_ANDAMENTO: "in_progress", ABERTO: "open", FINALIZADO: "completed" }[s] ?? s?.toLowerCase() ?? "open");
export const adaptType   = (t: string) => t?.toLowerCase() ?? "article";
export const adaptRole   = (r: string) => ({ PROFESSOR: "professor", ALUNO: "student" }[r] ?? "student");
export const adaptRequestStatus = (s: string) => s?.toLowerCase() ?? "pending";

export function adaptProject(p: any) {
  return p ? { ...p, area: adaptArea(p.area), status: adaptStatus(p.status) } : p;
}
export function adaptPublication(p: any) {
  return p ? { ...p, type: adaptType(p.type), tags: p.tags ?? [], authors: p.authors ?? [] } : p;
}
export function adaptUser(u: any) {
  if (!u) return u;
  return { ...u, role: adaptRole(u.role), bio: u.bio || "" };
}
export function adaptRequest(r: any) {
  return r ? { ...r, status: adaptRequestStatus(r.status), project: r.project ? adaptProject(r.project) : r.project } : r;
}
