export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  availability: string;
  condition: string;
  brand: string;
  quantity: number;
}

export interface CartProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  total: string;
}