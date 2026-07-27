import { api } from '../lib/api';
import type { Transaction } from '../types/transaction';

export const transactionsApi = {
  getAll: () => api.get<Transaction[]>('/transactions'),
  getByProduct: (productId: string) => api.get<Transaction[]>(`/transactions/product/${productId}`),
};