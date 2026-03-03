"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, User, Mail, Building2, GraduationCap, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/contexts/auth";
import { usersApi } from "@/lib/api/axios";

const roleLabelMap: Record<string, string> = {
  student: "Aluno",
  professor: "Professor",
  admin: "Administrador",
};

export default function PerfilPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setInstitution(user.institution || "");
      setDepartment(user.department || "");
      setBio(user.bio || "");
      setAvatarUrl(user.avatar || "");
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bioMax = 500;

  const handleSave = async () => {
    // Frontend validation
    if (bio.length > bioMax) {
      setMsg({ type: "error", text: `A bio deve ter no máximo ${bioMax} caracteres.` });
      return;
    }

    setSaving(true);
    setMsg(null);
    try {
      await usersApi.updateMe({ name, institution, department, bio, avatar: avatarUrl || null });
      // Update local storage so Navbar reflects changes
      const stored = localStorage.getItem("@labativo:user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const updated = { ...parsed, name, institution, department, bio, avatar: avatarUrl || null };
        localStorage.setItem("@labativo:user", JSON.stringify(updated));
      }
      setMsg({ type: "success", text: "Perfil atualizado com sucesso!" });
    } catch (err: any) {
      const fieldErrors = err?.response?.data?.errors?.fieldErrors;
      if (fieldErrors) {
        const msgs: string[] = [];
        if (fieldErrors.name) msgs.push(`Nome: ${fieldErrors.name.join(", ")}`);
        if (fieldErrors.bio) msgs.push(`Bio: ${fieldErrors.bio.join(", ")}`);
        if (fieldErrors.avatar) msgs.push(`Avatar: ${fieldErrors.avatar.join(", ")}`);
        if (fieldErrors.institution) msgs.push(`Instituição: ${fieldErrors.institution.join(", ")}`);
        if (fieldErrors.department) msgs.push(`Departamento: ${fieldErrors.department.join(", ")}`);
        if (msgs.length) {
          setMsg({ type: "error", text: msgs.join(" | ") });
        } else {
          setMsg({ type: "error", text: err?.response?.data?.message || "Erro ao salvar alterações." });
        }
      } else {
        const detail = err?.response?.data?.message || "Erro ao salvar alterações.";
        setMsg({ type: "error", text: detail });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Configurações do Perfil</h1>
        </div>

        {/* Avatar + Role */}
        <div className="flex items-center gap-4 mb-8 p-5 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
          {avatarUrl ? (
            <NextImage src={avatarUrl} alt={user.name} width={64} height={64} className="rounded-full object-cover shrink-0" loading="lazy" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-brand-700 dark:text-brand-300">{initials}</span>
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{user.name}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{roleLabelMap[user.role] ?? user.role}</p>
            <p className="text-xs text-neutral-400 mt-0.5">Membro desde {new Date(user.createdAt).toLocaleDateString("pt-BR")}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Informações Pessoais</h2>

          <Input
            label="Nome completo"
            leftIcon={<User size={16} className="text-neutral-400" />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="E-mail"
            leftIcon={<Mail size={16} className="text-neutral-400" />}
            value={email}
            disabled
            hint="O e-mail não pode ser alterado."
          />

          <Input
            label="Instituição"
            leftIcon={<Building2 size={16} className="text-neutral-400" />}
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Ex: Universidade Federal..."
          />

          <Input
            label="Departamento"
            leftIcon={<GraduationCap size={16} className="text-neutral-400" />}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Ex: Ciência da Computação"
          />

          <Input
            label="URL da foto de perfil"
            leftIcon={<ImageIcon size={16} className="text-neutral-400" />}
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://exemplo.com/sua-foto.jpg"
            hint="Cole o link de uma imagem para usar como avatar."
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={bioMax}
              placeholder="Conte um pouco sobre você..."
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all resize-none"
            />
            <span className={`text-xs text-right ${bio.length > bioMax * 0.9 ? "text-danger-600" : "text-neutral-400"}`}>
              {bio.length}/{bioMax}
            </span>
          </div>

          {msg && (
            <div className={`text-sm font-medium px-4 py-2.5 rounded-xl ${msg.type === "success" ? "bg-success-50 text-success-700" : "bg-danger-50 text-danger-700"}`}>
              {msg.text}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} loading={saving} className="gap-2">
              <Save size={15} /> Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
