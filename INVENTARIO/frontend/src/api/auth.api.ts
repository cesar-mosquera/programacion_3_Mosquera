import { api } from '../lib/api';
import type { LoginDto, RegisterDto, AuthResponse } from '../types/auth';

export const authApi = {
  login: (dto: LoginDto) => api.post<AuthResponse>('/auth/login', dto),
  register: (dto: RegisterDto) => api.post<AuthResponse>('/auth/register', dto),
};