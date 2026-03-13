export type CustomerType = 'retail' | 'wholesale';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  retailPrice: number;
  wholesalePrice: number;
  stock: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Transaction {
  id: string;
  date: Date;
  customerType: CustomerType;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'digital';
}

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  email?: string;
  phone?: string;
}
