"use client";

import { useState, useEffect, useCallback } from "react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft, Bell, BellOff, BookOpen, Calendar, CheckCircle2,
  ExternalLink, FileText, Image, LogOut, Mail, MessageCircle, Pencil, Phone,
  Play, Send, Users, AlertCircle, Clock, Plus, Trash2, Loader2, UserMinus, X,
  ClipboardList, CheckSquare, Square,
} from "lucide-react";
import { Badge, Avatar, Button, Skeleton } from "@/components/ui";
import { cn, AREA_LABELS, STATUS_LABELS } from "@/lib/utils";
import { z } from "zod";
import {
  useProject, useSubscriptionStatus, useSubscribe,
  useJoinRequest, useProjectPosts, useCreatePost, useUpdatePost, useDeletePost,
  useLeaveProject, useRemoveMember,
  useActivities, useActivity, useCreateActivity, useToggleActivity, useDeleteActivity,
  useUpdateProject,
} from "@/lib/hooks/useQueries";
import { memberRequestsApi } from "@/lib/api/axios";
import { useAuth } from "@/contexts/auth";
import { UserProfileModal } from "@/components/ui/UserProfileModal";

const joinSchema   = z.object({ message: z.string().min(30, "Descreva sua motivação (mín. 30 caracteres)").max(500) });
const postSchema   = z.object({
  title:   z.string().min(5, "Título muito curto").max(100),
  content: z.string().min(20, "Conteúdo muito curto"),
});

type JoinForm = z.infer<typeof joinSchema>;
type PostForm = z.infer<typeof postSchema>;
type MediaItem = { type: string; url: string; title: string };

const STATUS_VARIANT: Record<string, "success"|"brand"|"neutral"|"warning"> = {
  open: "success", in_progress: "brand", completed: "neutral",
};
const AREA_COLORS: Record<string, string> = {
  controle_sistemas:       "bg-blue-50   dark:bg-blue-950   text-blue-700   dark:text-blue-300",
  sistemas_mecatronicos:   "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300",
  acionamentos_eletricos:  "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
  sistemas_inteligentes:   "bg-cyan-50   dark:bg-cyan-950   text-cyan-700   dark:text-cyan-300",
  robotica_industrial:     "bg-rose-50   dark:bg-rose-950   text-rose-700   dark:text-rose-300",
  automacao_mecanica:      "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300",
  automacao_eletrica:      "bg-amber-50  dark:bg-amber-950  text-amber-700  dark:text-amber-300",
  engenharia_projeto:      "bg-teal-50   dark:bg-teal-950   text-teal-700   dark:text-teal-300",
  manufatura_digital:      "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300",
  projeto_computador:      "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
  simulacao_computacional: "bg-pink-50   dark:bg-pink-950   text-pink-700   dark:text-pink-300",
};
const MEDIA_ICON: Record<string, React.ElementType> = {
  IMAGE: Image, VIDEO: Play, ARTICLE_LINK: ExternalLink, DOCUMENT: FileText,
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();

  // ── State ──
  const [showJoinForm,  setShowJoinForm]  = useState(false);
  const [showPostForm,  setShowPostForm]  = useState(false);
  const [joinError,     setJoinError]     = useState("");
  const [postError,     setPostError]     = useState("");
  const [joinDone,      setJoinDone]      = useState(false);
  const [postPage,      setPostPage]      = useState(1);
  const [postMedia,     setPostMedia]     = useState<MediaItem[]>([]);
  const [editingPost,   setEditingPost]   = useState<string | null>(null);
  const [editMedia,     setEditMedia]     = useState<MediaItem[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [finalizeCheck1,    setFinalizeCheck1]    = useState(false);
  const [finalizeCheck2,    setFinalizeCheck2]    = useState(false);
  const [finalizeCooldown,  setFinalizeCooldown]  = useState(0);

  // ── Activity state ──
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityForm, setActivityForm] = useState({ title: "", description: "", dueDate: "", responsibleIds: [] as string[] });
  const [activityError, setActivityError] = useState("");

  // ── Cooldown timer (antes de qualquer return condicional) ──
  useEffect(() => {
    if (!showFinalizeModal) { setFinalizeCooldown(0); setFinalizeCheck1(false); setFinalizeCheck2(false); return; }
    setFinalizeCooldown(3);
    const interval = setInterval(() => {
      setFinalizeCooldown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showFinalizeModal]);

  // ── Queries ──
  const { data: project, isLoading } = useProject(id);
  const { data: subStatus }          = useSubscriptionStatus(id, isAuthenticated);
  const { data: postsData }          = useProjectPosts(id, postPage);
  const { data: activities = [] }    = useActivities(id);

  // ── Mutations ──
  const subscribeMut      = useSubscribe();
  const joinMut           = useJoinRequest();
  const createPostMut     = useCreatePost();
  const updatePostMut     = useUpdatePost();
  const deletePostMut     = useDeletePost();
  const leaveMut          = useLeaveProject();
  const removeMemberMut   = useRemoveMember();
  const finalizeMut       = useUpdateProject();
  const createActivityMut = useCreateActivity();
  const toggleActivityMut = useToggleActivity();
  const deleteActivityMut = useDeleteActivity();

  const handleFinalize = useCallback(async () => {
    try {
      await finalizeMut.mutateAsync({ id, data: { status: "FINALIZADO" } });
      setShowFinalizeModal(false);
      toast.success("Projeto finalizado com sucesso.");
    } catch {
      toast.error("Erro ao finalizar projeto.");
    }
  }, [finalizeMut, id]);

  const joinForm = useForm<JoinForm>({ resolver: zodResolver(joinSchema) });
  const postForm = useForm<PostForm>({ resolver: zodResolver(postSchema) });

  if (isLoading) return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-5 w-32 mb-6" />
      <Skeleton className="h-8 w-2/3 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
    </div>
  );
  if (!project) return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <p className="text-neutral-400">Projeto não encontrado</p>
      <Link href="/projetos"><Button variant="secondary" className="mt-4">Voltar</Button></Link>
    </div>
  );

  const isOwner      = user?.id === project.ownerId;
  const isMember     = isOwner || project.members?.some((m: any) => m.id === user?.id);
  const subscribed   = subStatus?.subscribed ?? false;
  const isOpen       = project.status === "open";
  const isInProgress = project.status === "in_progress";
  const isFull       = (project.enrolled ?? 0) >= (project.vacancies ?? 0);
  const canJoin      = isAuthenticated && !isOwner && !isMember && !joinDone && (isOpen || isInProgress) && !isFull;
  const canPost      = isAuthenticated && isMember;
  const posts        = postsData?.posts ?? [];

  const handleSubscribe = () => {
    if (!isAuthenticated) return;
    toast.promise(subscribeMut.mutateAsync({ id, subscribed }), {
      loading: subscribed ? "Cancelando inscrição..." : "Inscrevendo-se...",
      success: subscribed ? "Você não acompanha mais este projeto." : "Agora você acompanha este projeto!",
      error: "Erro ao alterar inscrição."
    });
  };

  const handleJoin = async (data: JoinForm) => {
    try {
      setJoinError("");
      await joinMut.mutateAsync({ id, data: { message: data.message } });
      setJoinDone(true);
      setShowJoinForm(false);
      toast.success("Solicitação enviada!", { description: "O criador do projeto será notificado." });
    } catch (err: any) {
      const msg = (err?.response?.data?.message ?? "") as string;
      const isDuplicate = err?.response?.status === 409 || /já|already|duplicate|existente|pendente/i.test(msg);
      if (isDuplicate) {
        try {
          const { data: myReqs } = await memberRequestsApi.my();
          const oldReqs = (Array.isArray(myReqs) ? myReqs : []).filter((r: any) => r.projectId === id || r.project?.id === id);
          for (const req of oldReqs) await memberRequestsApi.cancel(req.id);
          await joinMut.mutateAsync({ id, data: { message: data.message } });
          setJoinDone(true);
          setShowJoinForm(false);
          toast.success("Solicitação reenviada!", { description: "Sua solicitação anterior foi substituída." });
          return;
        } catch { /* fallthrough */ }
      }
      setJoinError(msg || "Erro ao enviar solicitação.");
      toast.error("Falha ao entrar no grupo", { description: msg || "Tente novamente mais tarde." });
    }
  };

  const handlePost = async (data: PostForm) => {
    try {
      setPostError("");
      const media = postMedia.filter(m => m.url.trim()).map(m => ({ type: m.type || "ARTICLE_LINK", url: m.url, title: m.title || undefined }));
      await createPostMut.mutateAsync({ projectId: id, data: { title: data.title, content: data.content, media: media.length > 0 ? media : undefined } });
      setShowPostForm(false); setPostMedia([]); postForm.reset();
      
      if (user?.role === "professor" || isOwner) {
        toast.success("Atualização publicada com sucesso!");
      } else {
        toast.success("Atualização enviada para análise!", { description: "Foi encaminhada ao professor responsável." });
      }
    } catch (err: any) { 
      const msg = err?.response?.data?.message ?? "Erro ao publicar.";
      setPostError(msg); 
      toast.error("Erro ao publicar", { description: msg });
    }
  };

  const handleEditPost = async (postId: string, data: PostForm) => {
    try {
      setPostError("");
      const media = editMedia.filter(m => m.url.trim()).map(m => ({ type: m.type || "ARTICLE_LINK", url: m.url, title: m.title || undefined }));
      await updatePostMut.mutateAsync({ id: postId, data: { title: data.title, content: data.content, media: media.length > 0 ? media : undefined } });
      setEditingPost(null); setEditMedia([]);
      toast.success("Atualização salva!");
    } catch (err: any) { 
      const msg = err?.response?.data?.message ?? "Erro ao salvar.";
      setPostError(msg); 
      toast.error("Erro ao salvar", { description: msg });
    }
  };

  const addMediaItem    = (setter: React.Dispatch<React.SetStateAction<MediaItem[]>>) => setter(prev => [...prev, { type: "IMAGE", url: "", title: "" }]);
  const updateMediaItem = (setter: React.Dispatch<React.SetStateAction<MediaItem[]>>, idx: number, field: keyof MediaItem, value: string) => setter(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  const removeMediaItem = (setter: React.Dispatch<React.SetStateAction<MediaItem[]>>, idx: number) => setter(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserProfileModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />

      {/* Modal de finalização */}
      {showFinalizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl max-w-md w-full border border-neutral-200 dark:border-neutral-700">
            <h2 className="font-display font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-1">Finalizar projeto</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">Esta ação é irreversível. O projeto ficará fechado para novas solicitações.</p>
            <div className="flex flex-col gap-3 mb-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={finalizeCheck1} onChange={e => setFinalizeCheck1(e.target.checked)} className="mt-0.5 accent-brand-600" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Entendo que o projeto ficará fechado para novas solicitações de entrada.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={finalizeCheck2} onChange={e => setFinalizeCheck2(e.target.checked)} className="mt-0.5 accent-brand-600" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Confirmo que todos os membros foram informados sobre o encerramento.</span>
              </label>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowFinalizeModal(false)}>Cancelar</Button>
              <Button
                variant="primary"
                disabled={!finalizeCheck1 || !finalizeCheck2 || finalizeCooldown > 0 || finalizeMut.isPending}
                onClick={handleFinalize}
                className="bg-danger-600 hover:bg-danger-700"
              >
                {finalizeMut.isPending ? "Finalizando..." : finalizeCooldown > 0 ? `Aguarde ${finalizeCooldown}s` : "Finalizar projeto"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Link href="/projetos" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-600 mb-6 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Todos os projetos
      </Link>

      {isOwner && (
        <div className="flex justify-end gap-2 mb-3">
          {project.status !== "completed" && (
            <button
              onClick={() => setShowFinalizeModal(true)}
              className="inline-flex items-center gap-1.5 text-sm text-danger-600 hover:text-danger-800 font-medium px-3 py-1.5 rounded-lg hover:bg-danger-50 transition-all border border-danger-200"
            >
              Finalizar projeto
            </button>
          )}
          <Link href={`/projetos/${id}/editar`}>
            <button className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-800 font-medium px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-all border border-brand-200">
              <Pencil size={13} /> Editar projeto
            </button>
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Main ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-card">
            {project.coverImage && (
              <NextImage src={project.coverImage} alt={project.title} width={800} height={400} className="w-full h-48 object-cover rounded-xl mb-5" loading="lazy" />
            )}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(project.areas?.length ? project.areas.map((a: string) => a.toLowerCase()) : [project.area]).map((a: string) => (
                <div key={a} className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", AREA_COLORS[a] || "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300")}>
                  {AREA_LABELS[a] || a}
                </div>
              ))}
              <Badge variant={STATUS_VARIANT[project.status]}>{STATUS_LABELS[project.status]}</Badge>
              <span className="text-xs text-neutral-400 ml-auto">{project.subscribersCount ?? 0} inscritos acompanhando</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 dark:text-neutral-100 leading-tight mb-3 break-words">{project.title}</h1>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed break-words">{project.description}</p>
            {(project.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((t: string) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium">#{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* Posts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-neutral-800 dark:text-neutral-200">Atualizações do projeto</h2>
              {canPost && (
                <Button size="sm" onClick={() => setShowPostForm(!showPostForm)}>
                  <Plus size={14} /> Novo Tópico
                </Button>
              )}
            </div>

            {showPostForm && (
              <form onSubmit={postForm.handleSubmit(handlePost)} className="bg-white dark:bg-neutral-800 border border-brand-200 dark:border-brand-900 rounded-2xl p-5 shadow-card mb-4">
                <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4">Publicar atualização</h3>
                {postError && <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-danger-50 text-danger-700 text-xs"><AlertCircle size={13} /> {postError}</div>}
                <div className="flex flex-col gap-3">
                  <input placeholder="Título da atualização *" className="w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100" {...postForm.register("title")} />
                  {postForm.formState.errors.title && <p className="text-xs text-danger-500 -mt-2">{postForm.formState.errors.title.message}</p>}
                  <textarea rows={4} placeholder="Descreva o progresso, conquistas ou novidades do projeto..." className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100" {...postForm.register("content")} />
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Mídias (imagem, vídeo, artigo, documento)</p>
                      <button type="button" onClick={() => addMediaItem(setPostMedia)} className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors"><Plus size={12} /> Adicionar mídia</button>
                    </div>
                    {postMedia.length === 0 && <p className="text-xs text-neutral-400 italic">Nenhuma mídia adicionada.</p>}
                    {postMedia.map((m, idx) => (
                      <div key={idx} className="flex flex-col gap-2 mt-2 p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600">
                        <div className="flex items-center gap-2">
                          <select value={m.type} onChange={e => updateMediaItem(setPostMedia, idx, "type", e.target.value)} className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs bg-white dark:bg-neutral-800 dark:text-neutral-100 outline-none focus:border-brand-500 flex-shrink-0">
                            <option value="IMAGE">📷 Imagem</option>
                            <option value="VIDEO">▶ Vídeo</option>
                            <option value="ARTICLE_LINK">📄 Link de artigo</option>
                            <option value="DOCUMENT">📁 Documento</option>
                          </select>
                          <input placeholder="Título da mídia" value={m.title} onChange={e => updateMediaItem(setPostMedia, idx, "title", e.target.value)} className="h-8 flex-1 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100" />
                          <button type="button" onClick={() => removeMediaItem(setPostMedia, idx)} className="p-1 rounded-md text-neutral-400 hover:text-danger-500 hover:bg-danger-50 transition-all flex-shrink-0"><X size={13} /></button>
                        </div>
                        {m.type === "IMAGE" ? (
                          <ImageUpload value={m.url} onChange={(url) => updateMediaItem(setPostMedia, idx, "url", url)} shape="square" previewSize={56} hint="" />
                        ) : (
                          <input placeholder="URL da mídia (https://...)" value={m.url} onChange={e => updateMediaItem(setPostMedia, idx, "url", e.target.value)} className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="secondary" size="sm" onClick={() => { setShowPostForm(false); setPostMedia([]); }}>Cancelar</Button>
                    <Button type="submit" size="sm" loading={createPostMut.isPending}><Send size={13} /> Publicar</Button>
                  </div>
                </div>
              </form>
            )}

            {posts.length === 0 ? (
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center text-neutral-400 text-sm shadow-card">Nenhuma atualização publicada ainda.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {posts.map((post: any) => {
                  const canEditPost = user?.id === post.authorId || isOwner;
                  const isEditing = editingPost === post.id;
                  return (
                    <article key={post.id} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={post.author?.name ?? "?"} size="sm" src={post.author?.avatar} />
                          <div>
                            <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{post.author?.name}</p>
                            <p className="text-[11px] text-neutral-400">{new Date(post.createdAt).toLocaleDateString("pt-BR", { day:"2-digit", month:"long", year:"numeric" })}</p>
                          </div>
                        </div>
                        {canEditPost && !isEditing && (
                          <div className="flex items-center gap-1">
                            <button onClick={() => { setEditingPost(post.id); setEditMedia((post.media ?? []).map((m: any) => ({ type: m.type ?? "IMAGE", url: m.url ?? "", title: m.title ?? "" }))); postForm.setValue("title", post.title); postForm.setValue("content", post.content); }} className="p-1.5 rounded-lg text-neutral-300 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all"><Pencil size={13} /></button>
                            <button onClick={() => {
                                toast("Excluir atualização?", {
                                  description: "Esta ação não pode ser desfeita.",
                                  action: { label: "Excluir", onClick: () => toast.promise(deletePostMut.mutateAsync(post.id), { loading: "Excluindo...", success: "Atualização excluída.", error: "Erro ao excluir." }) },
                                  cancel: { label: "Cancelar", onClick: () => {} },
                                });
                              }} 
                              className="p-1.5 rounded-lg text-neutral-300 hover:text-danger-500 hover:bg-danger-50 transition-all"><Trash2 size={13} /></button>
                          </div>
                        )}
                      </div>
                      {isEditing ? (
                        <form onSubmit={postForm.handleSubmit((data) => handleEditPost(post.id, data))} className="flex flex-col gap-3">
                          {postError && <div className="flex items-center gap-2 p-3 rounded-xl bg-danger-50 text-danger-700 text-xs"><AlertCircle size={13} /> {postError}</div>}
                          <input placeholder="Título" className="w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100" {...postForm.register("title")} />
                          <textarea rows={4} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100" {...postForm.register("content")} />
                          <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3 border border-neutral-200 dark:border-neutral-600">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Mídias</p>
                              <button type="button" onClick={() => addMediaItem(setEditMedia)} className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors"><Plus size={12} /> Adicionar mídia</button>
                            </div>
                            {editMedia.length === 0 && <p className="text-xs text-neutral-400 italic">Nenhuma mídia.</p>}
                            {editMedia.map((m, idx) => (
                              <div key={idx} className="flex flex-col gap-2 mt-2 p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600">
                                <div className="flex items-center gap-2">
                                  <select value={m.type} onChange={e => updateMediaItem(setEditMedia, idx, "type", e.target.value)} className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs bg-white dark:bg-neutral-800 dark:text-neutral-100 outline-none focus:border-brand-500 flex-shrink-0">
                                    <option value="IMAGE">📷 Imagem</option>
                                    <option value="VIDEO">▶ Vídeo</option>
                                    <option value="ARTICLE_LINK">📄 Link de artigo</option>
                                    <option value="DOCUMENT">📁 Documento</option>
                                  </select>
                                  <input placeholder="Título da mídia" value={m.title} onChange={e => updateMediaItem(setEditMedia, idx, "title", e.target.value)} className="h-8 flex-1 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100" />
                                  <button type="button" onClick={() => removeMediaItem(setEditMedia, idx)} className="p-1 rounded-md text-neutral-400 hover:text-danger-500 hover:bg-danger-50 transition-all flex-shrink-0"><X size={13} /></button>
                                </div>
                                <input placeholder="URL da mídia (https://...)" value={m.url} onChange={e => updateMediaItem(setEditMedia, idx, "url", e.target.value)} className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100" />
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button type="button" variant="secondary" size="sm" onClick={() => { setEditingPost(null); setEditMedia([]); postForm.reset(); }}>Cancelar</Button>
                            <Button type="submit" size="sm" loading={updatePostMut.isPending}><Send size={13} /> Salvar</Button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">{post.title}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{post.content}</p>
                          {(post.media ?? []).length > 0 && (
                            <div className="mt-4 flex flex-col gap-2">
                              {post.media.map((m: any) => {
                                const MIcon = MEDIA_ICON[m.type] ?? FileText;
                                if (m.type === "IMAGE") return (
                                  <NextImage key={m.id ?? m.url} src={m.url} alt={m.title ?? ""} width={800} height={400} className="w-full rounded-xl object-cover max-h-64" loading="lazy" />
                                );
                                return (
                                  <a key={m.id ?? m.url} href={m.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 hover:border-brand-300 transition-all text-sm">
                                    <MIcon size={14} className="text-brand-500 flex-shrink-0" />
                                    <span className="flex-1 text-neutral-700 dark:text-neutral-300 font-medium">{m.title ?? m.url}</span>
                                    <ExternalLink size={12} className="text-neutral-400" />
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </article>
                  );
                })}
                {postsData?.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-2">
                    <Button variant="secondary" size="sm" disabled={postPage <= 1} onClick={() => setPostPage(p => p - 1)}>Anterior</Button>
                    <span className="text-sm text-neutral-500 self-center">{postPage} / {postsData.totalPages}</span>
                    <Button variant="secondary" size="sm" disabled={postPage >= postsData.totalPages} onClick={() => setPostPage(p => p + 1)}>Próximo</Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Atividades ── */}
          {isMember && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                  <ClipboardList size={18} className="text-brand-600" /> Atividades
                </h2>
                {isOwner && (
                  <Button size="sm" variant="secondary" onClick={() => setShowActivityForm(!showActivityForm)}>
                    <Plus size={14} /> Nova atividade
                  </Button>
                )}
              </div>

              {/* Formulário nova atividade */}
              {showActivityForm && isOwner && (
                <div className="bg-white dark:bg-neutral-800 border border-brand-200 dark:border-brand-900 rounded-2xl p-5 shadow-card mb-4">
                  <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4">Nova atividade</h3>
                  <div className="flex flex-col gap-3">
                    <input
                      placeholder="Título da atividade *"
                      value={activityForm.title}
                      onChange={e => setActivityForm({ ...activityForm, title: e.target.value })}
                      className="w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 bg-white dark:bg-neutral-800 dark:text-neutral-100"
                    />
                    <textarea
                      placeholder="Descrição *"
                      rows={3}
                      value={activityForm.description}
                      onChange={e => setActivityForm({ ...activityForm, description: e.target.value })}
                      className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 resize-none bg-white dark:bg-neutral-800 dark:text-neutral-100"
                    />
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Data de término *</label>
                        <input
                          type="date"
                          value={activityForm.dueDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={e => setActivityForm({ ...activityForm, dueDate: e.target.value })}
                          className="w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 bg-white dark:bg-neutral-800 dark:text-neutral-100"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Responsáveis * <span className="font-normal">(selecione um ou mais)</span></label>
                        <div className="flex flex-wrap gap-2">
                          {(project.members ?? []).map((m: any) => {
                            const selected = activityForm.responsibleIds.includes(m.id);
                            return (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => {
                                  const ids = activityForm.responsibleIds;
                                  setActivityForm({
                                    ...activityForm,
                                    responsibleIds: selected
                                      ? ids.filter(id => id !== m.id)
                                      : [...ids, m.id],
                                  });
                                }}
                                className={cn(
                                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                                  selected
                                    ? "bg-brand-600 text-white border-brand-600"
                                    : "bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-brand-300"
                                )}
                              >
                                <Avatar name={m.name} size="sm" src={m.avatar} />
                                {m.name.split(" ")[0]}
                              </button>
                            );
                          })}
                        </div>
                        {activityForm.responsibleIds.length > 0 && (
                          <p className="text-xs text-brand-600">{activityForm.responsibleIds.length} responsável{activityForm.responsibleIds.length !== 1 ? "is" : ""} selecionado{activityForm.responsibleIds.length !== 1 ? "s" : ""}</p>
                        )}
                      </div>
                    </div>
                    {activityError && <p className="text-xs text-danger-500">{activityError}</p>}
                    <div className="flex gap-2 justify-end">
                      <Button type="button" variant="secondary" size="sm" onClick={() => { setShowActivityForm(false); setActivityError(""); }}>Cancelar</Button>
                      <Button
                        type="button"
                        size="sm"
                        loading={createActivityMut.isPending}
                        onClick={async () => {
                          setActivityError("");
                          if (!activityForm.title || !activityForm.description || !activityForm.dueDate || activityForm.responsibleIds.length === 0) { setActivityError("Preencha todos os campos."); return; }
                          if (new Date(activityForm.dueDate) < new Date(new Date().toDateString())) { setActivityError("A data de término não pode ser no passado."); return; }
                          try {
                            await createActivityMut.mutateAsync({ projectId: id, data: activityForm });
                            setActivityForm({ title: "", description: "", dueDate: "", responsibleIds: [] });
                            setShowActivityForm(false);
                            toast.success("Atividade criada com sucesso!");
                          } catch { 
                            setActivityError("Erro ao criar atividade."); 
                            toast.error("Erro ao criar atividade."); 
                          }
                        }}
                      >
                        Criar atividade
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista de atividades */}
              {activities.length === 0 ? (
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center text-neutral-400 text-sm shadow-card">
                  Nenhuma atividade cadastrada.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {activities.map((act: any) => {
                    const isOverdue = !act.done && new Date(act.dueDate) < new Date();
                    return (
                      <div
                        key={act.id}
                        className={cn(
                          "bg-white dark:bg-neutral-800 border rounded-2xl p-4 shadow-card flex items-start gap-3 transition-all",
                          act.done
                            ? "border-neutral-100 dark:border-neutral-700 opacity-60"
                            : isOverdue
                            ? "border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-950/20"
                            : "border-neutral-200 dark:border-neutral-700"
                        )}
                      >
                        <button
                          onClick={() => 
                            toast.promise(toggleActivityMut.mutateAsync({ projectId: id, activityId: act.id }), {
                              loading: act.done ? "Reabrindo atividade..." : "Concluindo atividade...",
                              success: act.done ? "Atividade reaberta!" : "Atividade finalizada!",
                              error: "Erro ao atualizar status."
                            })
                          }
                          className="mt-0.5 flex-shrink-0 text-brand-600 hover:text-brand-800 transition-colors"
                        >
                          {act.done ? <CheckSquare size={18} /> : <Square size={18} />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <Link href={`/projetos/${id}/atividades/${act.id}`}>
                            <p className={cn("text-sm font-semibold hover:text-brand-600 transition-colors cursor-pointer", act.done ? "line-through text-neutral-400 dark:text-neutral-500" : "text-neutral-900 dark:text-neutral-100")}>
                              {act.title}
                            </p>
                          </Link>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">{act.description}</p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <Avatar name={act.responsible?.name ?? "?"} size="sm" src={act.responsible?.avatar} />
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">{act.responsible?.name}</span>
                            </div>
                            <span className={cn("text-xs flex items-center gap-1", isOverdue && !act.done ? "text-danger-600 font-semibold" : "text-neutral-400")}>
                              <Calendar size={11} />
                              {new Date(act.dueDate).toLocaleDateString("pt-BR")}
                              {isOverdue && !act.done && (
                                <span className="ml-1 px-1.5 py-0.5 rounded-md bg-danger-100 dark:bg-danger-900 text-danger-700 dark:text-danger-300 text-[10px] font-bold">Atrasada</span>
                              )}
                            </span>
                            {act.done && (
                              <span className="text-xs px-1.5 py-0.5 rounded-md bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 font-semibold">Concluída</span>
                            )}
                          </div>
                        </div>
                        {isOwner && (
                          <button
                            onClick={() => {
                              toast("Excluir atividade?", {
                                action: { label: "Excluir", onClick: () => toast.promise(deleteActivityMut.mutateAsync({ projectId: id, activityId: act.id }), { loading: "Excluindo...", success: "Atividade excluída.", error: "Erro ao excluir." }) },
                                cancel: { label: "Cancelar", onClick: () => {} },
                              });
                            }}
                            className="flex-shrink-0 p-1.5 rounded-lg text-neutral-300 hover:text-danger-500 hover:bg-danger-50 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}


        </div>

        {/* ── Sidebar ── */}
        <div className="flex flex-col gap-4">

          {/* Ações */}
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
            {isAuthenticated ? (
              <Button variant={subscribed ? "secondary" : "primary"} className="w-full mb-3" loading={subscribeMut.isPending} onClick={handleSubscribe}>
                {subscribed ? <><BellOff size={15} /> Cancelar inscrição</> : <><Bell size={15} /> Acompanhar projeto</>}
              </Button>
            ) : (
              <Link href="/auth/login"><Button className="w-full mb-3"><Bell size={15} /> Acompanhar projeto</Button></Link>
            )}
            {joinDone ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-success-50 border border-success-200 text-success-700 text-sm"><CheckCircle2 size={15} /> Solicitação enviada!</div>
            ) : canJoin ? (
              <>
                {!showJoinForm ? (
                  <Button variant="secondary" className="w-full" onClick={() => setShowJoinForm(true)}><Users size={15} /> Entrar no grupo</Button>
                ) : (
                  <form onSubmit={joinForm.handleSubmit(handleJoin)} className="mt-2">
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Por que quer participar?</p>
                    {joinError && <p className="text-xs text-danger-500 mb-2">{joinError}</p>}
                    <textarea rows={3} placeholder="Descreva sua motivação e como pode contribuir com o grupo..." className={cn("w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all dark:bg-neutral-700 dark:text-neutral-100", joinForm.formState.errors.message && "border-danger-500")} {...joinForm.register("message")} />
                    {joinForm.formState.errors.message && <p className="text-xs text-danger-500 mt-1">{joinForm.formState.errors.message.message}</p>}
                    <div className="flex gap-2 mt-2">
                      <Button type="button" variant="secondary" size="sm" className="flex-1" onClick={() => setShowJoinForm(false)}>Cancelar</Button>
                      <Button type="submit" size="sm" className="flex-1" loading={joinMut.isPending}>Enviar</Button>
                    </div>
                  </form>
                )}
              </>
            ) : null}
            {isMember && !isOwner && (
              <Button variant="ghost" className="w-full text-danger-500 hover:bg-danger-50 hover:text-danger-700 mt-1" loading={leaveMut.isPending} onClick={() => {
                  toast("Deseja sair do grupo?", {
                    description: "Você perderá acesso às atividades exclusivas e não será mais considerado um membro.",
                    action: { label: "Sair do grupo", onClick: () => toast.promise(leaveMut.mutateAsync(id), { loading: "Saindo...", success: "Você saiu do projeto.", error: "Erro ao processar." }) },
                    cancel: { label: "Cancelar", onClick: () => {} },
                  });
              }}>
                <LogOut size={15} /> Sair do grupo
              </Button>
            )}
          </div>

          {/* Membros */}
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
              Grupo · {project.members?.length ?? 0} {project.members?.length === 1 ? "membro" : "membros"}
            </p>
            <div className="flex flex-col gap-2">
              {(project.members ?? []).slice(0, 6).map((m: any) => (
                <div key={m.id} className="flex items-center gap-2">
                  <Link href={`/usuarios/${m.id}`} className="rounded-full flex-shrink-0"><Avatar name={m.name} size="sm" src={m.avatar} /></Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/usuarios/${m.id}`} className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate hover:text-brand-600 hover:underline transition-colors block">{m.name}</Link>
                    {m.department && <p className="text-[11px] text-neutral-400 truncate">{m.department}</p>}
                  </div>
                  {m.id === project.ownerId ? (
                    <span className="text-[10px] bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 px-1.5 py-0.5 rounded font-semibold">Criador</span>
                  ) : isOwner ? (
                    <button onClick={() => {
                        toast(`Remover ${m.name} do projeto?`, {
                          action: { label: "Remover", onClick: () => toast.promise(removeMemberMut.mutateAsync({ projectId: id, userId: m.id }), { loading: "Removendo...", success: "Membro removido.", error: "Erro ao remover membro." }) },
                          cancel: { label: "Cancelar", onClick: () => {} },
                        });
                      }} className="p-1 rounded-md text-neutral-300 hover:text-danger-500 hover:bg-danger-50 transition-all"><UserMinus size={13} /></button>
                  ) : null}
                </div>
              ))}
              {(project.members?.length ?? 0) > 6 && <p className="text-xs text-neutral-400 text-center">+{project.members.length - 6} outros membros</p>}
            </div>
          </div>

          {/* Contato */}
          {(project.contactEmail || project.contactInfo) && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Contato</p>
              {project.contactEmail && <a href={`mailto:${project.contactEmail}`} className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 mb-2 transition-colors"><Mail size={14} /> {project.contactEmail}</a>}
              {project.contactInfo && <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{project.contactInfo}</p>}
            </div>
          )}

          {/* Info */}
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Informações</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Users size={14} className="text-brand-500" />
                {project.enrolled ?? 0}/{project.vacancies ?? 0} membros
                {(project.enrolled ?? 0) < (project.vacancies ?? 0) ? (
                  <span className="ml-auto text-xs bg-success-50 text-success-700 border border-success-200 px-1.5 py-0.5 rounded font-semibold">{(project.vacancies ?? 0) - (project.enrolled ?? 0)} vaga{((project.vacancies ?? 0) - (project.enrolled ?? 0)) !== 1 ? "s" : ""} aberta{((project.vacancies ?? 0) - (project.enrolled ?? 0)) !== 1 ? "s" : ""}</span>
                ) : (
                  <span className="ml-auto text-xs bg-danger-50 text-danger-700 border border-red-200 px-1.5 py-0.5 rounded font-semibold">Vagas esgotadas</span>
                )}
              </div>
              {project.startDate && <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300"><Calendar size={14} className="text-emerald-500" /> Início: {new Date(project.startDate).toLocaleDateString("pt-BR")}</div>}
              {project.applicationDeadline && <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300"><Clock size={14} className="text-warning-500" /> Inscrições até: {new Date(project.applicationDeadline).toLocaleDateString("pt-BR")}</div>}
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300"><Bell size={14} className="text-neutral-400" /> {project.subscribersCount ?? 0} acompanhando</div>
            </div>
          </div>

          {/* Criador */}
          {project.owner && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Criador do projeto</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                  {project.owner.avatar ? (
                    <NextImage src={project.owner.avatar} alt={project.owner.name} width={40} height={40} className="rounded-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-sm font-bold text-brand-700 dark:text-brand-300">{project.owner.name?.split(" ").slice(0,2).map((n: string) => n[0]).join("").toUpperCase()}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{project.owner.name}</p>
                  {project.owner.department && <p className="text-xs text-neutral-400 truncate">{project.owner.department}</p>}
                  {project.owner.institution && <p className="text-xs text-neutral-400 truncate">{project.owner.institution}</p>}
                </div>
              </div>
              {project.owner.linkedin && <a href={project.owner.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-800 transition-colors"><ExternalLink size={11} /> Ver LinkedIn</a>}
            </div>
          )}

          {/* Detalhes técnicos */}
          {(project.tempo || project.custo > 0 || project.escopo || project.category) && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Detalhes técnicos</p>
              <div className="flex flex-col gap-2 text-sm">
                {project.category && <div className="flex justify-between"><span className="text-neutral-400">Categoria</span><span className="font-medium text-neutral-700 dark:text-neutral-300">{project.categoryText || { MACRO_CAD: "Macro CAD", METROLOGIA: "Metrologia", OUTRO: "Outro" }[project.category as string] || project.category}</span></div>}
                {project.tempo && <div className="flex justify-between"><span className="text-neutral-400">Duração</span><span className="font-medium text-neutral-700 dark:text-neutral-300">{project.tempo}</span></div>}
                {project.custo > 0 && <div className="flex justify-between"><span className="text-neutral-400">Custo previsto</span><span className="font-medium text-neutral-700 dark:text-neutral-300">R$ {project.custo.toLocaleString("pt-BR")}</span></div>}
                {project.escopo && <div className="pt-1 border-t border-neutral-100 dark:border-neutral-700"><p className="text-neutral-400 mb-1">Escopo</p><p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-xs">{project.escopo}</p></div>}
              </div>
            </div>
          )}

          {/* Publicações */}
          {(project.publications ?? []).length > 0 && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
                <BookOpen size={12} className="inline mr-1" />Publicações
              </p>
              {project.publications.map((p: any) => (
                <div key={p.id} className="text-xs text-neutral-700 dark:text-neutral-300 py-2 border-b border-neutral-100 dark:border-neutral-700 last:border-0 last:pb-0">
                  {p.title} <span className="text-neutral-400">· {p.year}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
