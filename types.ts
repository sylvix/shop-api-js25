export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  createdAt: string;
}

export type ProductMutation = {
  title: string;
  price: number;
  description: string;
};