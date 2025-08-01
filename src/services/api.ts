import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  User,
  Message,
  MessageRequest,
  LoginRequest,
  LoginResponse,
  AuthResponse,
  RegistrationRequest,
  RegistrationResponse,
  UsernameCheckResponse,
  AdminStats,
  AdminResponse,
  RoleUpdateRequest,
  FileUploadResponse,
  UserCountResponse
} from '../types/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8086/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor для добавления токена
    this.api.interceptors.request.use((config: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor для обработки ошибок
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        // if (error.response?.status === 401) {
        //   localStorage.removeItem('token');
        // }
        return Promise.reject(error);
      }
    );
  }

  // Generic methods
  async get<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(endpoint);
    return response.data;
  }

  async post<T, V = any>(endpoint: string, data?: V): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(endpoint, data);
    return response.data;
  }

  async put<T, V = any>(endpoint: string, data?: V): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(endpoint);
    return response.data;
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', credentials);
  }

  async logout(): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/logout');
  }

  async getCurrentUser(): Promise<AuthResponse> {
    return this.get<AuthResponse>('/auth/me');
  }

  // Registration endpoints
  async register(user: RegistrationRequest): Promise<RegistrationResponse> {
    return this.post<RegistrationResponse>('/registration', user);
  }

  async checkUsername(username: string): Promise<UsernameCheckResponse> {
    return this.get<UsernameCheckResponse>(`/registration/check/${username}`);
  }

  // Users endpoints
  async getAllUsers(): Promise<User[]> {
    return this.get<User[]>('/users');
  }

  async getUserById(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.get<User>(`/users/username/${username}`);
  }

  async checkUsernameExists(username: string): Promise<UsernameCheckResponse> {
    return this.get<UsernameCheckResponse>(`/users/check/${username}`);
  }

  async getUserCount(): Promise<UserCountResponse> {
    return this.get<UserCountResponse>('/users/count');
  }

  async getAdmins(): Promise<User[]> {
    return this.get<User[]>('/users/admins');
  }

  async getActiveUsers(): Promise<User[]> {
    return this.get<User[]>('/users/active');
  }

  async registerUser(user: User): Promise<string> {
    return this.post<string>('/users/register', user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    return this.put<User>(`/users/${id}`, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete<void>(`/users/${id}`);
  }

  // Messages endpoints
  async getAllMessages(): Promise<Message[]> {
    return this.get<Message[]>('/messages');
  }

  async getMessageById(id: number): Promise<Message> {
    return this.get<Message>(`/messages/${id}`);
  }

  async createMessage(message: MessageRequest): Promise<Message> {
    return this.post<Message>('/messages', message);
  }

  async updateMessage(id: number, message: Message): Promise<Message> {
    return this.put<Message>(`/messages/${id}`, message);
  }

  async deleteMessage(id: number): Promise<void> {
    return this.delete<void>(`/messages/${id}`);
  }

  async getMessagesByTag(tag: string): Promise<Message[]> {
    return this.get<Message[]>(`/messages/tag/${tag}`);
  }

  async getMessagesByAuthor(authorId: number): Promise<Message[]> {
    return this.get<Message[]>(`/messages/author/${authorId}`);
  }

  // Admin endpoints
  async getAllUsersAdmin(): Promise<User[]> {
    return this.get<User[]>('/admin/users');
  }

  async activateUser(userId: number): Promise<AdminResponse> {
    return this.put<AdminResponse>(`/admin/users/${userId}/activate`);
  }

  async deactivateUser(userId: number): Promise<AdminResponse> {
    return this.put<AdminResponse>(`/admin/users/${userId}/deactivate`);
  }

  async updateUserRoles(userId: number, roles: RoleUpdateRequest): Promise<AdminResponse> {
    return this.put<AdminResponse>(`/admin/users/${userId}/roles`, roles);
  }

  async getAdminStats(): Promise<AdminStats> {
    return this.get<AdminStats>('/admin/stats');
  }

  // File upload endpoints
  async uploadAvatar(file: File, userId: number): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());

    const response: AxiosResponse<FileUploadResponse> = await this.api.post('/files/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteAvatar(userId: number): Promise<FileUploadResponse> {
    return this.delete<FileUploadResponse>(`/files/avatar/${userId}`);
  }

  // Helper method to get avatar URL
  getAvatarUrl(filename: string): string {
    return `http://localhost:8086/api/files/avatar/${filename}`;
  }
}

export const apiService = new ApiService();

// API endpoints для вашего Java бэкенда
export const apiEndpoints = {
  // Users endpoints
  users: {
    getAll: '/users',
    getById: (id: number) => `/users/${id}`,
    getByUsername: (username: string) => `/users/username/${username}`,
    register: '/users/register',
    update: (id: number) => `/users/${id}`,
    delete: (id: number) => `/users/${id}`,
  },
  
  // Messages endpoints
  messages: {
    getAll: '/messages',
    getById: (id: number) => `/messages/${id}`,
    create: '/messages',
    update: (id: number) => `/messages/${id}`,
    delete: (id: number) => `/messages/${id}`,
    getByTag: (tag: string) => `/messages/tag/${tag}`,
    getByAuthor: (authorId: number) => `/messages/author/${authorId}`,
  },
  
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  
  // Profile endpoints
  profile: {
    get: '/profile',
    update: '/profile',
  },
} as const; 