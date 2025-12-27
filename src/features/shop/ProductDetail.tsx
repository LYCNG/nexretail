import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { 
  Button, 
  InputNumber, 
  Tag, 
  Spin, 
  message, 
  Breadcrumb,
  Divider 
} from 'antd';
import { 
  ShoppingCartOutlined, 
  ArrowLeftOutlined,
  CheckCircleFilled 
} from '@ant-design/icons';
import { fetchProductById } from '../../mocks/api';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import type { ProductVariant } from '../../types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  // 取得唯一顏色列表
  const uniqueColors = product
    ? Array.from(
        new Map(
          product.variants.map((v) => [v.colorCode, { name: v.color, code: v.colorCode }])
        ).values()
      )
    : [];

  // 取得唯一尺寸列表
  const uniqueSizes = product
    ? Array.from(new Set(product.variants.map((v) => v.size)))
    : [];

  // 取得選中的變體
  const selectedVariant: ProductVariant | undefined = product?.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    dispatch(
      addToCart({
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        variantId: selectedVariant.id,
        sku: selectedVariant.sku,
        color: selectedVariant.color,
        colorCode: selectedVariant.colorCode,
        size: selectedVariant.size,
        price: selectedVariant.price,
        quantity,
      })
    );

    messageApi.success({
      content: t('shop.addedToCart'),
      icon: <CheckCircleFilled className="text-secondary" />,
    });
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

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          {t('common.noData')}
        </p>
        <Button type="link" onClick={() => navigate('/shop')}>
          {t('shop.backToShop')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {contextHolder}
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { title: <a onClick={() => navigate('/shop')}>{t('shop.title')}</a> },
          { title: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <Tag 
            color="gold" 
            className="absolute top-4 left-4 text-base px-4 py-1"
          >
            {t(`categories.${product.category}`)}
          </Tag>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary mt-2">
              {formatPrice(product.basePrice)}
            </p>
          </div>

          <Divider />

          {/* Color Selector */}
          <div>
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-3">
              {t('shop.selectColor')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {uniqueColors.map((color) => (
                <button
                  key={color.code}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                />
              ))}
            </div>
            {selectedColor && (
              <p className="mt-2 text-sm text-text-primary-light dark:text-text-primary-dark">
                {selectedColor}
              </p>
            )}
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-3">
              {t('shop.selectSize')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-10 px-4 rounded-lg border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-600 text-text-primary-light dark:text-text-primary-dark hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-3">
              {t('shop.quantity')}
            </h3>
            <InputNumber
              min={1}
              max={selectedVariant?.stock || 10}
              value={quantity}
              onChange={(value) => setQuantity(value || 1)}
              className="w-32"
            />
            {selectedVariant && (
              <span className="ml-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {t('products.stock')}: {selectedVariant.stock}
              </span>
            )}
          </div>

          <Divider />

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
              className="flex-1 h-12 text-base"
            >
              {t('shop.addToCart')}
            </Button>
          </div>

          {(!selectedColor || !selectedSize) && (
            <p className="text-sm text-warning">
              {t('shop.pleaseSelect')}
            </p>
          )}

          {/* Back Button */}
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/shop')}
            className="p-0"
          >
            {t('shop.continueShopping')}
          </Button>
        </div>
      </div>

      {/* Product Description Section */}
      {product.description && (
        <div className="mt-12 space-y-6">
          <Divider />
          
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
            {t('shop.productInfo')}
          </h2>

          {/* Summary */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6">
            <p className="text-lg text-text-primary-light dark:text-text-primary-dark leading-relaxed">
              {product.description.summary}
            </p>
          </div>

          {/* Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Material */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 space-y-2">
              <h4 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">
                {t('shop.material')}
              </h4>
              <p className="text-text-primary-light dark:text-text-primary-dark">
                {product.description.material}
              </p>
            </div>

            {/* Manufacturer */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 space-y-2">
              <h4 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">
                {t('shop.manufacturer')}
              </h4>
              <p className="text-text-primary-light dark:text-text-primary-dark">
                {product.description.manufacturer}
              </p>
            </div>

            {/* Origin */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 space-y-2">
              <h4 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">
                {t('shop.origin')}
              </h4>
              <p className="text-text-primary-light dark:text-text-primary-dark">
                {product.description.origin}
              </p>
            </div>

            {/* Care Instructions */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 space-y-2">
              <h4 className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide">
                {t('shop.careInstructions')}
              </h4>
              <p className="text-text-primary-light dark:text-text-primary-dark">
                {product.description.careInstructions}
              </p>
            </div>
          </div>

          {/* Notes */}
          {product.description.notes && (
            <div className="bg-warning/10 border border-warning/30 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-warning mb-2">
                {t('shop.notes')}
              </h4>
              <p className="text-text-primary-light dark:text-text-primary-dark">
                {product.description.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
