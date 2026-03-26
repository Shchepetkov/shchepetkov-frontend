export interface User {
  id: string | number;
  username: string;
  name: string;
  email?: string;
  fullName?: string;
  location?: string;
  bio?: string;
  active?: boolean;
  avatarPath?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface AuthUserDto {
  id: number;
  username: string;
  active: boolean;
  avatarPath?: string;
  fullName?: string;
  email?: string;
  location?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  location?: string;
  bio?: string;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  user?: AuthUserDto;
  token?: string;
}

export interface RegisterApiResponse {
  success: boolean;
  message: string;
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