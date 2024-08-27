export interface Product {
  id: number;
  category_id: number;
  title: string;
  price: number;
  description: string;
  image: string | null;
  created_at: string;
}

export interface Category {
  id: number;
  title: string;
  description: string | null;
}

export type ProductMutation = {
  category_id: number;
  title: string;
  price: number;
  description: string;
  image: string | null;
};