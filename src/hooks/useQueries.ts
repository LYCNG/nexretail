import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchProductById,
  updateProductPublishStatus,
  updateProductPrices,
  fetchOrders,
  fetchKpiData,
  fetchSalesTrend,
  fetchTopProducts,
  fetchWeeklyHeat,
  fetchStores,
  fetchUsers,
  updateUserRole,
} from '../mocks/api';
import type { StockStatus, User } from '../types';

// ==================== Products Queries ====================

export const useProducts = (params?: {
  search?: string;
  category?: string;
  status?: StockStatus;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};

export const useUpdateProductPublish = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ids, isPublished }: { ids: string[]; isPublished: boolean }) =>
      updateProductPublishStatus(ids, isPublished),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProductPrices = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ids, priceChange }: { ids: string[]; priceChange: number }) =>
      updateProductPrices(ids, priceChange),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// ==================== Orders Queries ====================

export const useOrders = (params?: {
  storeId?: string;
  status?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
  });
};

// ==================== Dashboard Queries ====================

export const useKpiData = () => {
  return useQuery({
    queryKey: ['kpi'],
    queryFn: fetchKpiData,
  });
};

export const useSalesTrend = (days: number = 30) => {
  return useQuery({
    queryKey: ['salesTrend', days],
    queryFn: () => fetchSalesTrend(days),
  });
};

// ==================== Analytics Queries ====================

export const useTopProducts = (storeId?: string) => {
  return useQuery({
    queryKey: ['topProducts', storeId],
    queryFn: () => fetchTopProducts(storeId),
  });
};

export const useWeeklyHeat = (storeId?: string) => {
  return useQuery({
    queryKey: ['weeklyHeat', storeId],
    queryFn: () => fetchWeeklyHeat(storeId),
  });
};

// ==================== Stores Queries ====================

export const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  });
};

// ==================== Users Queries ====================

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: User['role'] }) =>
      updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
