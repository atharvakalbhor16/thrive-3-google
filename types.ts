
export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  shortDescription: string;
  description: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: Order[];
  addresses: Address[];
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
}

export enum SortOption {
  POPULARITY = 'popularity',
  PRICE_LOW_HIGH = 'price_low_high',
  PRICE_HIGH_LOW = 'price_high_low',
  NEW_ARRIVALS = 'new_arrivals'
}
