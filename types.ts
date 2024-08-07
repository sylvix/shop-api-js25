export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
}

export type ProductWithoutId = Omit<Product, 'id'>;