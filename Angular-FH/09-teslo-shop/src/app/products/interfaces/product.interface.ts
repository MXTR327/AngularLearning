import { User } from '@auth/interfaces/user.interface';

export enum Gender
{
  Kid = 'kid',
  Men = 'men',
  Unisex = 'unisex',
  Women = 'women',
}

export enum Size
{
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}

export interface Product
{
  description: string;
  gender: Gender;
  id: string;
  images: string[];
  price: number;
  sizes: Size[];
  slug: string;
  stock: number;
  tags: string[];
  title: string;
  user: User;
}

export interface ProductsResponse
{
  count: number;
  pages: number;
  products: Product[];
}
