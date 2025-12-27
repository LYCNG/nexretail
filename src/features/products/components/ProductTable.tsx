import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Tag, Image, Switch, Card, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Product, ProductVariant } from '../../../types';
import { getProductTotalStock, getProductStockStatus } from '../../../mocks/data/products';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  selectedRowKeys: React.Key[];
  onSelectChange: (keys: React.Key[]) => void;
}

const ProductTable = ({
  products,
  loading,
  selectedRowKeys,
  onSelectChange,
}: ProductTableProps) => {
  const { t } = useTranslation();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const categoryLabels: Record<string, string> = {
    tops: t('categories.tops'),
    bottoms: t('categories.bottoms'),
    dresses: t('categories.dresses'),
    outerwear: t('categories.outerwear'),
    accessories: t('categories.accessories'),
  };

  const statusConfig = {
    inStock: { color: 'green', label: t('products.inStock') },
    lowStock: { color: 'orange', label: t('products.lowStock') },
    outOfStock: { color: 'red', label: t('products.outOfStock') },
  };

  // 變體表格欄位
  const variantColumns: ColumnsType<ProductVariant> = [
    {
      title: t('products.color'),
      dataIndex: 'color',
      key: 'color',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: record.colorCode }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: t('products.size'),
      dataIndex: 'size',
      key: 'size',
      render: (text) => (
        <Tag className="font-mono">{text}</Tag>
      ),
    },
    {
      title: t('products.sku'),
      dataIndex: 'sku',
      key: 'sku',
      render: (text) => (
        <span className="font-mono text-xs text-gray-500">{text}</span>
      ),
    },
    {
      title: t('products.stock'),
      dataIndex: 'stock',
      key: 'stock',
      render: (value) => (
        <span className={value < 10 ? 'text-red-500 font-medium' : ''}>
          {value}
        </span>
      ),
    },
    {
      title: t('products.price'),
      dataIndex: 'price',
      key: 'price',
      render: (value) => (
        <span className="font-medium">NT$ {value.toLocaleString()}</span>
      ),
    },
  ];

  // 主表格欄位
  const columns: ColumnsType<Product> = [
    {
      title: t('products.productName'),
      key: 'product',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.image}
            alt={record.name}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJpAN46+QDOAAAAABJRU5ErkJggg=="
          />
          <div>
            <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
              {record.name}
            </p>
            <p className="text-xs text-gray-500">
              {record.variants.length} {t('products.variants')}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t('products.category'),
      dataIndex: 'category',
      key: 'category',
      render: (category) => categoryLabels[category] || category,
    },
    {
      title: t('products.totalStock'),
      key: 'totalStock',
      render: (_, record) => {
        const total = getProductTotalStock(record);
        const status = getProductStockStatus(record);
        const config = statusConfig[status];
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{total}</span>
            <Tag color={config.color} className="text-xs">
              {config.label}
            </Tag>
          </div>
        );
      },
    },
    {
      title: t('products.price'),
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (value) => (
        <span className="font-medium">NT$ {value.toLocaleString()}</span>
      ),
    },
    {
      title: t('products.status'),
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished) => (
        <Switch
          checked={isPublished}
          checkedChildren="上架"
          unCheckedChildren="下架"
          className={isPublished ? 'bg-primary' : ''}
        />
      ),
    },
  ];

  // 手機版卡片渲染
  const renderMobileCard = (product: Product) => {
    const total = getProductTotalStock(product);
    const status = getProductStockStatus(product);
    const config = statusConfig[status];
    const isSelected = selectedRowKeys.includes(product.id);

    return (
      <Card
        key={product.id}
        className={`mb-3 rounded-xl border-2 transition-all ${
          isSelected ? 'border-primary bg-primary/5' : 'border-transparent'
        }`}
        bodyStyle={{ padding: '12px' }}
      >
        <div className="flex gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={isSelected}
            onChange={(e) => {
              if (e.target.checked) {
                onSelectChange([...selectedRowKeys, product.id]);
              } else {
                onSelectChange(selectedRowKeys.filter((key) => key !== product.id));
              }
            }}
            className="mt-1"
          />

          {/* Image */}
          <Image
            src={product.image}
            alt={product.name}
            width={72}
            height={72}
            className="rounded-lg object-cover shrink-0"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJpAN46+QDOAAAAABJRU5ErkJggg=="
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-text-primary-light dark:text-text-primary-dark line-clamp-1">
                {product.name}
              </h3>
              <Switch
                checked={product.isPublished}
                size="small"
                checkedChildren="上架"
                unCheckedChildren="下架"
                className={product.isPublished ? 'bg-primary shrink-0' : 'shrink-0'}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Tag className="text-xs">{categoryLabels[product.category]}</Tag>
              <span className="text-xs text-gray-500">
                {product.variants.length} {t('products.variants')}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold text-primary">
                NT$ {product.basePrice.toLocaleString()}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">{t('products.stock')}:</span>
                <span className="font-medium">{total}</span>
                <Tag color={config.color} className="text-xs ml-1">
                  {config.label}
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      {/* Desktop Table - hidden on mobile */}
      <div className="hidden lg:block">
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          expandable={{
            expandedRowKeys,
            onExpandedRowsChange: (keys) => setExpandedRowKeys(keys as React.Key[]),
            expandedRowRender: (record) => (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg -m-2">
                <h4 className="text-sm font-medium mb-3 text-text-primary-light dark:text-text-primary-dark">
                  {t('products.variants')} ({record.variants.length})
                </h4>
                <Table
                  columns={variantColumns}
                  dataSource={record.variants}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </div>
            ),
          }}
        
          className="nex-table"
        />
      </div>

      {/* Mobile Card View - shown only on mobile */}
      <div className="lg:hidden">
        {loading ? (
          <div className="text-center py-8 text-gray-500">載入中...</div>
        ) : (
          <>
            {/* Select All */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <Checkbox
                checked={selectedRowKeys.length === products.length && products.length > 0}
                indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < products.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSelectChange(products.map((p) => p.id));
                  } else {
                    onSelectChange([]);
                  }
                }}
              />
              <span className="text-sm text-gray-500">
                {selectedRowKeys.length > 0
                  ? `已選擇 ${selectedRowKeys.length} 件`
                  : `共 ${products.length} 件商品`}
              </span>
            </div>

            {/* Cards - 無限滾動 */}
            {products.map(renderMobileCard)}
          </>
        )}
      </div>
    </>
  );
};

export default ProductTable;

