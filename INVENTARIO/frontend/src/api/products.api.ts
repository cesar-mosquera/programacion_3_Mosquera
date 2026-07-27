import { api } from '../lib/api';
import type { Product, CreateProductDto, UpdateProductDto, MovementDto } from '../types/product';

export const productsApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (dto: CreateProductDto) => api.post<Product>('/products', dto),
  update: (id: string, dto: UpdateProductDto) => api.put<Product>(`/products/${id}`, dto),
  delete: (id: string) => api.delete<void>(`/products/${id}`),
  sell: (id: string, dto: MovementDto) => api.post<Product>(`/products/${id}/sell`, dto),
  restock: (id: string, dto: MovementDto) => api.post<Product>(`/products/${id}/restock`, dto),
};