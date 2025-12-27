import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useQueries';
import ProductFilters from './components/ProductFilters';
import ProductTable from './components/ProductTable';
import BatchActions from './components/BatchActions';
import type { StockStatus } from '../../types';

const Products = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState<StockStatus | ''>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data: products, isLoading } = useProducts({
    search: search || undefined,
    category: category !== 'all' ? category : undefined,
    status: status || undefined,
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {t('products.title')}
        </h1>
   
      </div>

      {/* Filters */}
      <div className="card">
        <ProductFilters
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onStatusChange={(val) => setStatus(val as StockStatus | '')}
        />
      </div>

      {/* Batch Actions */}
      <BatchActions
        selectedIds={selectedRowKeys.map(String)}
        onClear={() => setSelectedRowKeys([])}
      />

      {/* Product Table */}
      <div className="card">
        <ProductTable
          products={products || []}
          loading={isLoading}
          selectedRowKeys={selectedRowKeys}
          onSelectChange={setSelectedRowKeys}
        />
      </div>
    </div>
  );
};

export default Products;
