export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  type: 'fisico' | 'digital';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  type: 'fisico' | 'digital';
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  type?: 'fisico' | 'digital';
}

export interface MovementDto {
  quantity: number;
}