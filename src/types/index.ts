export interface User {
  id: string;
  name: string;
  email: string;
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