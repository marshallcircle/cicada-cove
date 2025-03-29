export type ProductStatus = 'active' | 'sold';
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface ProductMeasurements {
  chest?: string;
  waist?: string;
  shoulders?: string;
  length?: string;
  sleeve?: string;
  hips?: string;
  inseam?: string;
  rise?: string;
  [key: string]: string | undefined; // Allow for custom measurements
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Product {
  id: string;
  title: string;
  designer: string;
  era: string;
  description?: string;
  condition: string;
  price: number;
  images: string[];
  measurements?: ProductMeasurements;
  status: ProductStatus;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_email: string;
  shipping_address: ShippingAddress;
  total: number;
  stripe_payment_id?: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  price: number;
  created_at: string;
  product?: Product;
}

export interface OrderWithItems extends Order {
  order_items: (OrderItem & { product: Product })[];
}

// For creating new records
export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_items'>;
export type OrderItemInsert = Omit<OrderItem, 'id' | 'created_at' | 'product'>;