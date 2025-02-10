export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'student' | 'instructor';
  enrolledCourses: number[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 