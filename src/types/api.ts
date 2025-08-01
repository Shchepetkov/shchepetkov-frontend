// User types
export interface User {
  id: number;
  username: string;
  password?: string;
  email?: string;
  active: boolean;
  roles: Role[];
  avatarPath?: string;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

// Registration types
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

// Message types
export interface Message {
  id: number;
  text: string;
  tag: string;
  author: User;
  createdAt?: string;
}

export interface MessageRequest {
  text: string;
  tag: string;
  authorId: number;
}

// Auth types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  timestamp?: string;
}

// Registration types
export interface RegistrationRequest {
  username: string;
  password: string;
  email?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
}

export interface UsernameCheckResponse {
  exists: boolean;
  available: boolean;
}

// Admin types
export interface AdminStats {
  success: boolean;
  message?: string;
  totalUsers?: number;
  activeUsers?: number;
  adminUsers?: number;
  inactiveUsers?: number;
}

export interface AdminResponse {
  success: boolean;
  message: string;
}

export interface RoleUpdateRequest {
  roles: Role[];
}

// File upload types
export interface FileUploadResponse {
  success: boolean;
  message: string;
  filename?: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

// User count response
export interface UserCountResponse {
  count: number;
} 