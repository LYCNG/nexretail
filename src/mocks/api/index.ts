import type { Product, Order, User, KpiData, SalesTrend, TopProduct, WeeklyHeat, StockStatus, CheckoutForm, OrderResult, CartItem } from '../../types';
import { mockProducts, getProductStockStatus } from '../data/products';
import { mockStores } from '../data/stores';
import { mockOrders, mockKpiData, mockSalesTrend, mockTopProducts, mockWeeklyHeat } from '../data/orders';
import { mockUsers } from '../data/users';

// 模擬網路延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== Products API ====================

export const fetchProducts = async (params?: {
  search?: string;
  category?: string;
  status?: StockStatus;
}): Promise<Product[]> => {
  await delay(300);
  
  let filtered = [...mockProducts];
  
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.variants.some(v => v.sku.toLowerCase().includes(searchLower))
    );
  }
  
  if (params?.category && params.category !== 'all') {
    filtered = filtered.filter(p => p.category === params.category);
  }
  
  if (params?.status) {
    filtered = filtered.filter(p => getProductStockStatus(p) === params.status);
  }
  
  return filtered;
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  await delay(200);
  return mockProducts.find(p => p.id === id) || null;
};

export const updateProductPublishStatus = async (ids: string[], isPublished: boolean): Promise<void> => {
  await delay(300);
  // 模擬更新操作
  console.log(`Updated ${ids.length} products to ${isPublished ? 'published' : 'unpublished'}`);
};

export const updateProductPrices = async (ids: string[], priceChange: number): Promise<void> => {
  await delay(300);
  console.log(`Updated prices for ${ids.length} products by ${priceChange}`);
};

// ==================== Orders API ====================

export const fetchOrders = async (params?: {
  storeId?: string;
  status?: string;
  limit?: number;
}): Promise<Order[]> => {
  await delay(300);
  
  let filtered = [...mockOrders];
  
  if (params?.storeId && params.storeId !== 'all') {
    filtered = filtered.filter(o => o.storeId === params.storeId);
  }
  
  if (params?.status) {
    filtered = filtered.filter(o => o.status === params.status);
  }
  
  if (params?.limit) {
    filtered = filtered.slice(0, params.limit);
  }
  
  return filtered;
};

// ==================== Dashboard API ====================

export const fetchKpiData = async (): Promise<KpiData> => {
  await delay(400);
  return mockKpiData;
};

export const fetchSalesTrend = async (days: number = 30): Promise<SalesTrend[]> => {
  await delay(300);
  return mockSalesTrend.slice(-days);
};

// ==================== Analytics API ====================

export const fetchTopProducts = async (_storeId?: string): Promise<TopProduct[]> => {
  await delay(350);
  // 在實際應用中，這裡會根據 storeId 過濾
  return mockTopProducts;
};

export const fetchWeeklyHeat = async (_storeId?: string): Promise<WeeklyHeat[]> => {
  
  await delay(300);
  return mockWeeklyHeat;
};

// ==================== Stores API ====================

export const fetchStores = async () => {
  await delay(200);
  return mockStores;
};

// ==================== Users API ====================

export const fetchUsers = async (): Promise<User[]> => {
  await delay(300);
  return mockUsers;
};

export const updateUserRole = async (userId: string, role: User['role']): Promise<void> => {
  await delay(300);
  console.log(`Updated user ${userId} role to ${role}`);
};

// ==================== Shop API ====================

export const submitOrder = async (
  items: CartItem[],
  customerInfo: CheckoutForm
): Promise<OrderResult> => {
  await delay(800);
  
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  console.log('Order submitted:', { orderNumber, items, customerInfo, totalAmount });
  
  return {
    success: true,
    orderNumber,
    totalAmount,
    createdAt: new Date().toISOString(),
  };
};
