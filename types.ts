import { Model, Types } from 'mongoose';

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
  role: string;
  displayName?: string;
  googleID?: string;
  __confirmPassword: string;
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;


export interface ReviewFields {
  user: Types.ObjectId,
  product: Types.ObjectId,
  text: string;
  review: number;
}

