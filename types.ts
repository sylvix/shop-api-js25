import { Model } from 'mongoose';

export type ProductMutation = {
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
};

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;