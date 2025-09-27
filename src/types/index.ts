// Типы для пользователя
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Типы для аутентификации
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthApiResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

// Типы для резюме
export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  education: Education[];
  languages: Language[];
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  fullName: string;
  fullNameEn: string;
  position: string;
  positionEn: string;
  email: string;
  phone?: string;
  location: string;
  locationEn: string;
  bio: string;
  bioEn: string;
  avatar?: string;
  resumePdfUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  companyEn: string;
  position: string;
  positionEn: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  descriptionEn: string;
  technologies: string[];
  achievements: string[];
  achievementsEn: string[];
}

export interface Skill {
  id: string;
  name: string;
  nameEn: string;
  category: SkillCategory;
  level: SkillLevel;
  description?: string;
  descriptionEn?: string;
}

export type SkillCategory = 
  | 'programming'
  | 'testing'
  | 'tools'
  | 'frameworks'
  | 'databases'
  | 'cloud'
  | 'cicd'
  | 'other';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Project {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  startDate: string;
  endDate?: string;
  isCompleted: boolean;
  features: string[];
  featuresEn: string[];
}

export interface Education {
  id: string;
  institution: string;
  institutionEn: string;
  degree: string;
  degreeEn: string;
  field: string;
  fieldEn: string;
  startDate: string;
  endDate: string;
  description?: string;
  descriptionEn?: string;
}

export interface Language {
  id: string;
  name: string;
  nameEn: string;
  level: LanguageLevel;
  isNative: boolean;
}

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native';

// Типы для контактной формы
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// Типы для API ответов
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

// Типы для состояния приложения
export interface AppState {
  theme: 'light' | 'dark';
  language: 'ru' | 'en';
  isLoading: boolean;
  error: string | null;
}

// Типы для компонентов
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  className?: string;
}
