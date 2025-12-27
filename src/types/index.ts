// 商品型別定義
export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  colorCode: string;
  size: string;
  stock: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories';
  image: string;
  basePrice: number;
  isPublished: boolean;
  variants: ProductVariant[];
  description?: ProductDescription;
  createdAt: string;
  updatedAt: string;
}

// 商品介紹型別
export interface ProductDescription {
  summary: string;           // 商品簡介
  material: string;          // 材質
  manufacturer: string;      // 製造商
  origin: string;            // 製造區域
  careInstructions: string;  // 清洗/保養說明
  notes?: string;            // 注意事項
}

export type StockStatus = 'inStock' | 'lowStock' | 'outOfStock';

// 訂單型別定義
export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  sku: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  storeId: string;
  storeName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  customerEmail: string;
  createdAt: string;
}

// 分店型別定義
export interface Store {
  id: string;
  name: string;
  location: string;
  manager: string;
  isActive: boolean;
}

// 使用者型別定義
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  avatar?: string;
  storeId?: string;
  storeName?: string;
  lastLoginAt: string;
  createdAt: string;
}

// KPI 型別定義
export interface KpiData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  inventoryTurnover: number;
  revenueChange: number;
  ordersChange: number;
  aovChange: number;
  turnoverChange: number;
}

// 銷售分析型別
export interface SalesTrend {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  rank: number;
  productId: string;
  productName: string;
  image: string;
  unitsSold: number;
  revenue: number;
}

export interface WeeklyHeat {
  day: string;
  hour: number;
  value: number;
}

// 購物車型別定義
export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  sku: string;
  color: string;
  colorCode: string;
  size: string;
  price: number;
  quantity: number;
}

// 結帳表單型別
export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// 訂單結果型別
export interface OrderResult {
  success: boolean;
  orderNumber: string;
  totalAmount: number;
  createdAt: string;
}
