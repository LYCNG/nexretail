import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme as antdTheme } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import { useEffect } from 'react';

import { store } from './store';
import { useAppSelector } from './store/hooks';
import './i18n/config';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './features/dashboard/Dashboard';
import Products from './features/products/Products';
import Analytics from './features/analytics/Analytics';
import Settings from './features/settings/Settings';

// Shop pages
import ShopLayout from './components/shop/ShopLayout';
import Shop from './features/shop/Shop';
import ProductDetail from './features/shop/ProductDetail';
import Cart from './features/shop/Cart';
import Checkout from './features/shop/Checkout';

// Entry page
import EntryPage from './features/entry/EntryPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppContent = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  return (
    <ConfigProvider
      locale={zhTW}
      theme={{
        algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#E07A5F',
          colorSuccess: '#81B29A',
          colorWarning: '#F2CC8F',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Table: {
            headerBg: themeMode === 'dark' ? '#2D2D2D' : '#FAF8F5',
            rowHoverBg: themeMode === 'dark' ? '#3D3D3D' : '#FFF5F2',
          },
          Button: {
            primaryShadow: '0 4px 14px 0 rgba(224, 122, 95, 0.3)',
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* Entry Page */}
          <Route path="/" element={<EntryPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Shop Routes */}
          <Route path="/shop" element={<ShopLayout />}>
            <Route index element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
