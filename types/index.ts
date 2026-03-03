// ─── Auth ───────────────────────────────────────────────────────────────────
export type UserRole = "student" | "professor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  institution?: string;
  bio?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ─── Projects ────────────────────────────────────────────────────────────────
export type ProjectStatus = "open" | "in_progress" | "closed" | "completed";
export type ProjectArea =
  | "technology"
  | "health"
  | "education"
  | "environment"
  | "law"
  | "arts"
  | "engineering"
  | "social";

export interface Project {
  id: string;
  title: string;
  description: string;
  area: ProjectArea;
  status: ProjectStatus;
  vacancies: number;
  enrolled: number;
  professor: Pick<User, "id" | "name" | "avatar" | "department">;
  tags: string[];
  startDate: string;
  endDate?: string;
  createdAt: string;
  applicationDeadline?: string;
}

export interface ProjectApplication {
  id: string;
  projectId: string;
  studentId: string;
  student: Pick<User, "id" | "name" | "avatar">;
  status: "pending" | "approved" | "rejected";
  message: string;
  createdAt: string;
}

// ─── Publications ────────────────────────────────────────────────────────────
export type PublicationType = "article" | "report" | "presentation" | "thesis";

export interface Publication {
  id: string;
  title: string;
  abstract: string;
  content?: string;
  images?: string[];
  references?: string[];
  type: PublicationType;
  authors: Pick<User, "id" | "name">[];
  project?: Pick<Project, "id" | "title">;
  year: number;
  journal?: string;
  doi?: string;
  tags: string[];
  downloadUrl?: string;
  createdAt: string;
}

// ─── Notifications ───────────────────────────────────────────────────────────
export type NotificationType = "MEMBER_LEFT" | "MEMBER_REMOVED" | "REQUEST_ACCEPTED" | "REQUEST_REJECTED" | "GENERAL";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  read: boolean;
  projectId?: string;
  project?: Pick<Project, "id" | "title">;
  createdAt: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
export interface DashboardStats {
  activeProjects: number;
  totalApplications: number;
  pendingApplications: number;
  completedProjects: number;
}

// ─── API ─────────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ─── Forms ───────────────────────────────────────────────────────────────────
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  institution: string;
}

export interface ProjectApplicationFormData {
  message: string;
}
