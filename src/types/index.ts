export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string; 
}


export interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Receipt {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  total: string;
  timestamp: string;
}
