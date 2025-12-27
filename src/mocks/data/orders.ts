import type { Order, KpiData, SalesTrend, TopProduct, WeeklyHeat } from '../../types';
import { mockProducts } from './products';
import { mockStores } from './stores';

// 生成隨機訂單
const generateOrders = (): Order[] => {
  const orders: Order[] = [];
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const customerNames = ['王小明', '李美麗', '張大偉', '陳雅琪', '林志豪', '黃淑惠', '吳建國', '劉佳玲'];
  
  for (let i = 0; i < 50; i++) {
    const store = mockStores[Math.floor(Math.random() * mockStores.length)];
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let totalAmount = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const variant = product.variants[Math.floor(Math.random() * product.variants.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const subtotal = variant.price * quantity;
      totalAmount += subtotal;
      
      items.push({
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        quantity,
        unitPrice: variant.price,
        subtotal,
      });
    }
    
    const daysAgo = Math.floor(Math.random() * 30);
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - daysAgo);
    
    orders.push({
      id: `order-${String(i + 1).padStart(3, '0')}`,
      orderNumber: `ORD-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(i + 1).padStart(5, '0')}`,
      storeId: store.id,
      storeName: store.name,
      items,
      totalAmount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      customerEmail: `customer${i + 1}@example.com`,
      createdAt: orderDate.toISOString(),
    });
  }
  
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const mockOrders = generateOrders();

// KPI 資料
export const mockKpiData: KpiData = {
  totalRevenue: 2847650,
  totalOrders: 1234,
  avgOrderValue: 2308,
  inventoryTurnover: 4.2,
  revenueChange: 12.5,
  ordersChange: 8.3,
  aovChange: -2.1,
  turnoverChange: 15.7,
};

// 銷售趨勢 (過去 30 天)
export const mockSalesTrend: SalesTrend[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const baseRevenue = 80000 + Math.random() * 40000;
  const weekday = date.getDay();
  // 週末銷售較高
  const weekendBoost = (weekday === 0 || weekday === 6) ? 1.3 : 1;
  
  return {
    date: date.toISOString().split('T')[0],
    revenue: Math.round(baseRevenue * weekendBoost),
    orders: Math.floor(30 + Math.random() * 20 * weekendBoost),
  };
});

// Top 10 熱銷商品
export const mockTopProducts: TopProduct[] = [
  { rank: 1, productId: 'prod-005', productName: '韓系落肩T恤', image: mockProducts[4].image, unitsSold: 328, revenue: 291920 },
  { rank: 2, productId: 'prod-002', productName: '法式圓領針織衫', image: mockProducts[1].image, unitsSold: 256, revenue: 430080 },
  { rank: 3, productId: 'prod-010', productName: '修身牛仔褲', image: mockProducts[9].image, unitsSold: 198, revenue: 312840 },
  { rank: 4, productId: 'prod-001', productName: '輕量羊毛混紡大衣', image: mockProducts[0].image, unitsSold: 145, revenue: 722100 },
  { rank: 5, productId: 'prod-003', productName: '高腰西裝寬褲', image: mockProducts[2].image, unitsSold: 134, revenue: 305520 },
  { rank: 6, productId: 'prod-011', productName: '絲質襯衫', image: mockProducts[10].image, unitsSold: 121, revenue: 300080 },
  { rank: 7, productId: 'prod-004', productName: '飄逸雪紡連身裙', image: mockProducts[3].image, unitsSold: 98, revenue: 321440 },
  { rank: 8, productId: 'prod-007', productName: '羊絨圍巾', image: mockProducts[6].image, unitsSold: 89, revenue: 113920 },
  { rank: 9, productId: 'prod-009', productName: '輕薄羽絨外套', image: mockProducts[8].image, unitsSold: 76, revenue: 279680 },
  { rank: 10, productId: 'prod-008', productName: '皮質托特包', image: mockProducts[7].image, unitsSold: 65, revenue: 174200 },
];

// 週銷售熱度圖
export const mockWeeklyHeat: WeeklyHeat[] = (() => {
  const days = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
  const data: WeeklyHeat[] = [];
  
  for (const day of days) {
    for (let hour = 10; hour <= 21; hour++) {
      let baseValue = 20;
      // 午餐和晚餐時段較高
      if (hour >= 12 && hour <= 13) baseValue = 60;
      if (hour >= 18 && hour <= 20) baseValue = 80;
      // 週末整體較高
      if (day === '週六' || day === '週日') baseValue *= 1.5;
      
      data.push({
        day,
        hour,
        value: Math.round(baseValue + Math.random() * 30),
      });
    }
  }
  
  return data;
})();
