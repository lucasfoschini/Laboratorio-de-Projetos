"use client";

import { useState } from "react";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft, Bell, BellOff, BookOpen, Calendar, CheckCircle2,
  ExternalLink, FileText, Image, LogOut, Mail, MessageCircle, Pencil, Phone,
  Play, Send, Users, AlertCircle, Clock, Plus, Trash2, Loader2, UserMinus, X,
} from "lucide-react";
import { Badge, Avatar, Button, Skeleton } from "@/components/ui";
import { cn, AREA_LABELS, STATUS_LABELS } from "@/lib/utils";
import { z } from "zod";
import {
  useProject, useSubscriptionStatus, useSubscribe,
  useJoinRequest, useProjectPosts, useCreatePost, useUpdatePost, useDeletePost,
  useLeaveProject, useRemoveMember,
} from "@/lib/hooks/useQueries";
import { memberRequestsApi } from "@/lib/api/axios";
import { useAuth } from "@/contexts/auth";

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
  technology:"bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300", health:"bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
  education:"bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300",    environment:"bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
  law:"bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300",              arts:"bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300",
  engineering:"bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300", social:"bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300",
};
const MEDIA_ICON: Record<string, React.ElementType> = {
  IMAGE: Image, VIDEO: Play, ARTICLE_LINK: ExternalLink, DOCUMENT: FileText,
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [showJoinForm,  setShowJoinForm]  = useState(false);
  const [showPostForm,  setShowPostForm]  = useState(false);
  const [joinError,     setJoinError]     = useState("");
  const [postError,     setPostError]     = useState("");
  const [joinDone,      setJoinDone]      = useState(false);
  const [postPage,      setPostPage]      = useState(1);
  const [postMedia,     setPostMedia]     = useState<MediaItem[]>([]);
  const [editingPost,   setEditingPost]   = useState<string | null>(null);
  const [editMedia,     setEditMedia]     = useState<MediaItem[]>([]);

  const { data: project, isLoading } = useProject(id);
  const { data: subStatus }          = useSubscriptionStatus(id, isAuthenticated);
  const { data: postsData }          = useProjectPosts(id, postPage);

  const subscribeMut   = useSubscribe();
  const joinMut        = useJoinRequest();
  const createPostMut  = useCreatePost();
  const updatePostMut  = useUpdatePost();
  const deletePostMut  = useDeletePost();
  const leaveMut       = useLeaveProject();
  const removeMemberMut = useRemoveMember();

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

  const isOwner     = user?.id === project.ownerId;
  const isMember    = project.members?.some((m: any) => m.id === user?.id);
  const subscribed  = subStatus?.subscribed ?? false;
  const isOpen      = project.status === "open";
  const isInProgress = project.status === "in_progress";
  const isFull      = (project.enrolled ?? 0) >= (project.vacancies ?? 0);
  const canJoin     = isAuthenticated && !isOwner && !isMember && !joinDone && (isOpen || isInProgress) && !isFull;
  const canPost     = isAuthenticated && isMember;
  const posts       = postsData?.posts ?? [];

  const handleSubscribe = () => {
    if (!isAuthenticated) return;
    subscribeMut.mutate({ id, subscribed });
  };

  const handleJoin = async (data: JoinForm) => {
    try {
      setJoinError("");
      await joinMut.mutateAsync({ id, data: { message: data.message } });
      setJoinDone(true);
      setShowJoinForm(false);
    } catch (err: any) {
      const msg = (err?.response?.data?.message ?? "") as string;
      const isDuplicate = err?.response?.status === 409
        || /já|already|duplicate|existente|pendente/i.test(msg);

      if (isDuplicate) {
        try {
          // Cancel old request(s) for this project and retry
          const { data: myReqs } = await memberRequestsApi.my();
          const oldReqs = (Array.isArray(myReqs) ? myReqs : []).filter(
            (r: any) => r.projectId === id || r.project?.id === id,
          );
          for (const req of oldReqs) {
            await memberRequestsApi.cancel(req.id);
          }
          // Retry join
          await joinMut.mutateAsync({ id, data: { message: data.message } });
          setJoinDone(true);
          setShowJoinForm(false);
          return;
        } catch {
          // fallthrough to generic error
        }
      }

      setJoinError(msg || "Erro ao enviar solicitação.");
    }
  };

  const handlePost = async (data: PostForm) => {
    try {
      setPostError("");
      const media = postMedia.filter(m => m.url.trim()).map(m => ({ type: m.type || "ARTICLE_LINK", url: m.url, title: m.title || undefined }));
      await createPostMut.mutateAsync({ projectId: id, data: { title: data.title, content: data.content, media: media.length > 0 ? media : undefined } });
      setShowPostForm(false);
      setPostMedia([]);
      postForm.reset();
    } catch (err: any) {
      setPostError(err?.response?.data?.message ?? "Erro ao publicar.");
    }
  };

  const handleEditPost = async (postId: string, data: PostForm) => {
    try {
      setPostError("");
      const media = editMedia.filter(m => m.url.trim()).map(m => ({ type: m.type || "ARTICLE_LINK", url: m.url, title: m.title || undefined }));
      await updatePostMut.mutateAsync({ id: postId, data: { title: data.title, content: data.content, media: media.length > 0 ? media : undefined } });
      setEditingPost(null);
      setEditMedia([]);
    } catch (err: any) {
      setPostError(err?.response?.data?.message ?? "Erro ao salvar.");
    }
  };

  const addMediaItem = (setter: React.Dispatch<React.SetStateAction<MediaItem[]>>) => {
    setter(prev => [...prev, { type: "IMAGE", url: "", title: "" }]);
  };
  const updateMediaItem = (setter: React.Dispatch<React.SetStateAction<MediaItem[]>>, idx: number, field: keyof MediaItem, value: string) => {
    setter(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };
  const removeMediaItem = (setter: React.Dispatch<React.SetStateAction<MediaItem[]>>, idx: number) => {
    setter(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/projetos" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-600 mb-6 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Todos os projetos
      </Link>

      {/* Edit button row for owner */}
      {isOwner && (
        <div className="flex justify-end mb-3">
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

          {/* Header do projeto */}
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-card">
            {project.coverImage && (
              <NextImage
                src={project.coverImage}
                alt={project.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover rounded-xl mb-5"
                loading="lazy"
              />
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

          {/* Posts / Atualizações */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-neutral-800 dark:text-neutral-200">Atualizações do projeto</h2>
              {canPost && (
                <Button size="sm" onClick={() => setShowPostForm(!showPostForm)}>
                  <Plus size={14} /> Nova atualização
                </Button>
              )}
            </div>

            {/* Formulário de novo post */}
            {showPostForm && (
              <form onSubmit={postForm.handleSubmit(handlePost)} className="bg-white dark:bg-neutral-800 border border-brand-200 dark:border-brand-900 rounded-2xl p-5 shadow-card mb-4">
                <h3 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-4">Publicar atualização</h3>
                {postError && (
                  <div className="flex items-center gap-2 p-3 mb-3 rounded-xl bg-danger-50 text-danger-700 text-xs">
                    <AlertCircle size={13} /> {postError}
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <input
                    placeholder="Título da atualização *"
                    className="w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100"
                    {...postForm.register("title")}
                  />
                  {postForm.formState.errors.title && <p className="text-xs text-danger-500 -mt-2">{postForm.formState.errors.title.message}</p>}
                  <textarea
                    rows={4}
                    placeholder="Descreva o progresso, conquistas ou novidades do projeto..."
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100"
                    {...postForm.register("content")}
                  />

                  {/* Mídias dinâmicas */}
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Mídias (imagem, vídeo, artigo, documento)</p>
                      <button type="button" onClick={() => addMediaItem(setPostMedia)} className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors">
                        <Plus size={12} /> Adicionar mídia
                      </button>
                    </div>
                    {postMedia.length === 0 && (
                      <p className="text-xs text-neutral-400 italic">Nenhuma mídia adicionada. Clique em &quot;Adicionar mídia&quot; para incluir.</p>
                    )}
                    {postMedia.map((m, idx) => (
                      <div key={idx} className="flex flex-col gap-2 mt-2 p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600">
                        <div className="flex items-center gap-2">
                          <select
                            value={m.type}
                            onChange={e => updateMediaItem(setPostMedia, idx, "type", e.target.value)}
                            className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs bg-white dark:bg-neutral-800 dark:text-neutral-100 outline-none focus:border-brand-500 flex-shrink-0"
                          >
                            <option value="IMAGE">📷 Imagem</option>
                            <option value="VIDEO">▶ Vídeo</option>
                            <option value="ARTICLE_LINK">📄 Link de artigo</option>
                            <option value="DOCUMENT">📁 Documento</option>
                          </select>
                          <input
                            placeholder="Título da mídia"
                            value={m.title}
                            onChange={e => updateMediaItem(setPostMedia, idx, "title", e.target.value)}
                            className="h-8 flex-1 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100"
                          />
                          <button type="button" onClick={() => removeMediaItem(setPostMedia, idx)} className="p-1 rounded-md text-neutral-400 hover:text-danger-500 hover:bg-danger-50 transition-all flex-shrink-0">
                            <X size={13} />
                          </button>
                        </div>
                        <input
                          placeholder="URL da mídia (https://...)"
                          value={m.url}
                          onChange={e => updateMediaItem(setPostMedia, idx, "url", e.target.value)}
                          className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100"
                        />
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

            {/* Lista de posts */}
            {posts.length === 0 ? (
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center text-neutral-400 text-sm shadow-card">
                Nenhuma atualização publicada ainda.
              </div>
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
                            <button
                              onClick={() => {
                                setEditingPost(post.id);
                                setEditMedia((post.media ?? []).map((m: any) => ({ type: m.type ?? "IMAGE", url: m.url ?? "", title: m.title ?? "" })));
                                postForm.setValue("title", post.title);
                                postForm.setValue("content", post.content);
                              }}
                              className="p-1.5 rounded-lg text-neutral-300 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all"
                              title="Editar"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => deletePostMut.mutate(post.id)}
                              className="p-1.5 rounded-lg text-neutral-300 hover:text-danger-500 hover:bg-danger-50 transition-all"
                              title="Excluir"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        /* ── Formulário de edição inline ── */
                        <form onSubmit={postForm.handleSubmit((data) => handleEditPost(post.id, data))} className="flex flex-col gap-3">
                          {postError && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-danger-50 text-danger-700 text-xs">
                              <AlertCircle size={13} /> {postError}
                            </div>
                          )}
                          <input
                            placeholder="Título"
                            className="w-full h-10 rounded-xl border border-neutral-300 dark:border-neutral-600 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100"
                            {...postForm.register("title")}
                          />
                          <textarea
                            rows={4}
                            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white dark:bg-neutral-700 dark:text-neutral-100"
                            {...postForm.register("content")}
                          />

                          {/* Mídias dinâmicas — edição */}
                          <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-3 border border-neutral-200 dark:border-neutral-600">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Mídias</p>
                              <button type="button" onClick={() => addMediaItem(setEditMedia)} className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors">
                                <Plus size={12} /> Adicionar mídia
                              </button>
                            </div>
                            {editMedia.length === 0 && (
                              <p className="text-xs text-neutral-400 italic">Nenhuma mídia.</p>
                            )}
                            {editMedia.map((m, idx) => (
                              <div key={idx} className="flex flex-col gap-2 mt-2 p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={m.type}
                                    onChange={e => updateMediaItem(setEditMedia, idx, "type", e.target.value)}
                                    className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs bg-white dark:bg-neutral-800 dark:text-neutral-100 outline-none focus:border-brand-500 flex-shrink-0"
                                  >
                                    <option value="IMAGE">📷 Imagem</option>
                                    <option value="VIDEO">▶ Vídeo</option>
                                    <option value="ARTICLE_LINK">📄 Link de artigo</option>
                                    <option value="DOCUMENT">📁 Documento</option>
                                  </select>
                                  <input
                                    placeholder="Título da mídia"
                                    value={m.title}
                                    onChange={e => updateMediaItem(setEditMedia, idx, "title", e.target.value)}
                                    className="h-8 flex-1 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100"
                                  />
                                  <button type="button" onClick={() => removeMediaItem(setEditMedia, idx)} className="p-1 rounded-md text-neutral-400 hover:text-danger-500 hover:bg-danger-50 transition-all flex-shrink-0">
                                    <X size={13} />
                                  </button>
                                </div>
                                <input
                                  placeholder="URL da mídia (https://...)"
                                  value={m.url}
                                  onChange={e => updateMediaItem(setEditMedia, idx, "url", e.target.value)}
                                  className="h-8 px-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-xs outline-none focus:border-brand-500 bg-white dark:bg-neutral-800 dark:text-neutral-100"
                                />
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 justify-end">
                            <Button type="button" variant="secondary" size="sm" onClick={() => { setEditingPost(null); setEditMedia([]); postForm.reset(); }}>Cancelar</Button>
                            <Button type="submit" size="sm" loading={updatePostMut.isPending}><Send size={13} /> Salvar</Button>
                          </div>
                        </form>
                      ) : (
                        /* ── Conteúdo do post (modo leitura) ── */
                        <>
                          <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">{post.title}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{post.content}</p>

                          {/* Mídia */}
                          {(post.media ?? []).length > 0 && (
                            <div className="mt-4 flex flex-col gap-2">
                              {post.media.map((m: any) => {
                                const MIcon = MEDIA_ICON[m.type] ?? FileText;
                                if (m.type === "IMAGE") return (
                                  <NextImage
                                    key={m.id ?? m.url}
                                    src={m.url}
                                    alt={m.title ?? ""}
                                    width={800}
                                    height={400}
                                    className="w-full rounded-xl object-cover max-h-64"
                                    loading="lazy"
                                  />
                                );
                                return (
                                  <a key={m.id ?? m.url} href={m.url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 hover:border-brand-300 transition-all text-sm">
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
                {/* Paginação */}
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
        </div>

        {/* ── Sidebar ── */}
        <div className="flex flex-col gap-4">

          {/* Ações */}
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
            {/* Inscrever-se */}
            {isAuthenticated ? (
              <Button
                variant={subscribed ? "secondary" : "primary"}
                className="w-full mb-3"
                loading={subscribeMut.isPending}
                onClick={handleSubscribe}
              >
                {subscribed ? <><BellOff size={15} /> Cancelar inscrição</> : <><Bell size={15} /> Acompanhar projeto</>}
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button className="w-full mb-3"><Bell size={15} /> Acompanhar projeto</Button>
              </Link>
            )}

            {/* Entrar no grupo */}
            {joinDone ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-success-50 border border-success-200 text-success-700 text-sm">
                <CheckCircle2 size={15} /> Solicitação enviada!
              </div>
            ) : canJoin ? (
              <>
                {!showJoinForm ? (
                  <Button variant="secondary" className="w-full" onClick={() => setShowJoinForm(true)}>
                    <Users size={15} /> Entrar no grupo
                  </Button>
                ) : (
                  <form onSubmit={joinForm.handleSubmit(handleJoin)} className="mt-2">
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Por que quer participar?</p>
                    {joinError && <p className="text-xs text-danger-500 mb-2">{joinError}</p>}
                    <textarea
                      rows={3}
                      placeholder="Descreva sua motivação e como pode contribuir com o grupo..."
                      className={cn("w-full rounded-xl border border-neutral-300 dark:border-neutral-600 p-3 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all dark:bg-neutral-700 dark:text-neutral-100", joinForm.formState.errors.message && "border-danger-500")}
                      {...joinForm.register("message")}
                    />
                    {joinForm.formState.errors.message && <p className="text-xs text-danger-500 mt-1">{joinForm.formState.errors.message.message}</p>}
                    <div className="flex gap-2 mt-2">
                      <Button type="button" variant="secondary" size="sm" className="flex-1" onClick={() => setShowJoinForm(false)}>Cancelar</Button>
                      <Button type="submit" size="sm" className="flex-1" loading={joinMut.isPending}>Enviar</Button>
                    </div>
                  </form>
                )}
              </>
            ) : null}

            {/* Sair do grupo — apenas para membros que NÃO são o criador */}
            {isMember && !isOwner && (
              <Button
                variant="ghost"
                className="w-full text-danger-500 hover:bg-danger-50 hover:text-danger-700 mt-1"
                loading={leaveMut.isPending}
                onClick={() => {
                  if (confirm("Tem certeza que deseja sair deste projeto?")) leaveMut.mutate(id);
                }}
              >
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
                  <Avatar name={m.name} size="sm" src={m.avatar} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">{m.name}</p>
                    {m.department && <p className="text-[11px] text-neutral-400 truncate">{m.department}</p>}
                  </div>
                  {m.id === project.ownerId ? (
                    <span className="text-[10px] bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 px-1.5 py-0.5 rounded font-semibold">Criador</span>
                  ) : isOwner ? (
                    <button
                      onClick={() => {
                        if (confirm(`Remover ${m.name} do projeto?`)) removeMemberMut.mutate({ projectId: id, userId: m.id });
                      }}
                      className="p-1 rounded-md text-neutral-300 hover:text-danger-500 hover:bg-danger-50 transition-all"
                      title={`Remover ${m.name}`}
                    >
                      <UserMinus size={13} />
                    </button>
                  ) : null}
                </div>
              ))}
              {(project.members?.length ?? 0) > 6 && (
                <p className="text-xs text-neutral-400 text-center">+{project.members.length - 6} outros membros</p>
              )}
            </div>
          </div>

          {/* Contato */}
          {(project.contactEmail || project.contactInfo) && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Contato</p>
              {project.contactEmail && (
                <a href={`mailto:${project.contactEmail}`} className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 mb-2 transition-colors">
                  <Mail size={14} /> {project.contactEmail}
                </a>
              )}
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
                {(project.enrolled ?? 0) < (project.vacancies ?? 0) && (
                  <span className="ml-auto text-xs bg-success-50 text-success-700 border border-success-200 px-1.5 py-0.5 rounded font-semibold">
                    {(project.vacancies ?? 0) - (project.enrolled ?? 0)} vaga{((project.vacancies ?? 0) - (project.enrolled ?? 0)) !== 1 ? "s" : ""} aberta{((project.vacancies ?? 0) - (project.enrolled ?? 0)) !== 1 ? "s" : ""}
                  </span>
                )}
                {(project.enrolled ?? 0) >= (project.vacancies ?? 0) && (
                  <span className="ml-auto text-xs bg-danger-50 text-danger-700 border border-red-200 px-1.5 py-0.5 rounded font-semibold">Vagas esgotadas</span>
                )}
              </div>
              {project.startDate && (
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Calendar size={14} className="text-emerald-500" />
                  Início: {new Date(project.startDate).toLocaleDateString("pt-BR")}
                </div>
              )}
              {project.applicationDeadline && (
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Clock size={14} className="text-warning-500" />
                  Inscrições até: {new Date(project.applicationDeadline).toLocaleDateString("pt-BR")}
                </div>
              )}
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Bell size={14} className="text-neutral-400" />
                {project.subscribersCount ?? 0} acompanhando
              </div>
            </div>
          </div>

          {/* Criador do projeto */}
          {project.owner && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Criador do projeto</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center flex-shrink-0">
                  {project.owner.avatar ? (
                    <NextImage src={project.owner.avatar} alt={project.owner.name} width={40} height={40} className="rounded-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-sm font-bold text-brand-700 dark:text-brand-300">
                      {project.owner.name?.split(" ").slice(0,2).map((n: string) => n[0]).join("").toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{project.owner.name}</p>
                  {project.owner.department && (
                    <p className="text-xs text-neutral-400 truncate">{project.owner.department}</p>
                  )}
                  {project.owner.institution && (
                    <p className="text-xs text-neutral-400 truncate">{project.owner.institution}</p>
                  )}
                </div>
              </div>
              {project.owner.linkedin && (
                <a href={project.owner.linkedin} target="_blank" rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-800 transition-colors">
                  <ExternalLink size={11} /> Ver LinkedIn
                </a>
              )}
            </div>
          )}

          {/* Detalhes técnicos */}
          {(project.tempo || project.custo > 0 || project.escopo || project.category) && (
            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Detalhes técnicos</p>
              <div className="flex flex-col gap-2 text-sm">
                {project.category && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Categoria</span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{project.categoryText || { MACRO_CAD: "Macro CAD", METROLOGIA: "Metrologia", OUTRO: "Outro" }[project.category as string] || project.category}</span>
                  </div>
                )}
                {project.tempo && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Duração</span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{project.tempo}</span>
                  </div>
                )}
                {project.custo > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Custo previsto</span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">R$ {project.custo.toLocaleString("pt-BR")}</span>
                  </div>
                )}
                {project.escopo && (
                  <div className="pt-1 border-t border-neutral-100 dark:border-neutral-700">
                    <p className="text-neutral-400 mb-1">Escopo</p>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-xs">{project.escopo}</p>
                  </div>
                )}
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
