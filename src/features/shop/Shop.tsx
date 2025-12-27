import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, Input, Select, Empty, Spin, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchProducts } from '../../mocks/api';
import type { Product } from '../../types';

const { Search } = Input;

const Shop = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(''); // 即時輸入值
  const [debouncedSearch, setDebouncedSearch] = useState(''); // 防抖後的搜尋值
  const [category, setCategory] = useState('all');

  const { data: products, isLoading } = useQuery({
    queryKey: ['shopProducts', debouncedSearch, category],
    queryFn: () => fetchProducts({ 
      search: debouncedSearch, 
      category: category === 'all' ? undefined : category 
    }),
    select: (data) => data.filter(p => p.isPublished), // 只顯示已上架商品
  });

  const categories = [
    { value: 'all', label: t('products.allCategories') },
    { value: 'tops', label: t('categories.tops') },
    { value: 'bottoms', label: t('categories.bottoms') },
    { value: 'dresses', label: t('categories.dresses') },
    { value: 'outerwear', label: t('categories.outerwear') },
    { value: 'accessories', label: t('categories.accessories') },
  ];

  const handleProductClick = (productId: string) => {
    navigate(`/shop/product/${productId}`);
  };

  const formatPrice = (price: number) => {
    return `NT$ ${price.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gradient-warm mb-4">
          {t('shop.title')}
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
          探索我們精選的時尚服飾
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-light dark:bg-surface-dark rounded-2xl p-4">
        <Search
          placeholder={t('products.searchPlaceholder')}
          allowClear
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-full sm:w-80"
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={() => setDebouncedSearch(searchInput)}
        />
        
        <Select
          value={category}
          onChange={setCategory}
          options={categories}
          className="w-full sm:w-48"
        />
      </div>

      {/* Products Grid */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Card
              key={product.id}
              hoverable
              className="overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-surface-dark"
              cover={
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <Tag 
                    color="gold" 
                    className="absolute top-3 left-3 backdrop-blur-sm"
                  >
                    {t(`categories.${product.category}`)}
                  </Tag>
                </div>
              }
              onClick={() => handleProductClick(product.id)}
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-text-primary-light dark:text-text-primary-dark line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.basePrice)}
                  </span>
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {product.variants.length} {t('shop.variants')}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Empty description={t('common.noData')} />
      )}
    </div>
  );
};

export default Shop;
