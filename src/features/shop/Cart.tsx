import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Button, 
  InputNumber, 
  Empty, 
  Divider,
  Popconfirm 
} from 'antd';
import { 
  DeleteOutlined, 
  ShoppingOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { 
  selectCartItems, 
  selectCartTotal, 
  removeFromCart, 
  updateQuantity,
  clearCart 
} from '../../store/slices/cartSlice';

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  const formatPrice = (price: number) => {
    return `NT$ ${price.toLocaleString()}`;
  };

  const handleQuantityChange = (variantId: string, value: number | null) => {
    if (value && value > 0) {
      dispatch(updateQuantity({ variantId, quantity: value }));
    }
  };

  const handleRemove = (variantId: string) => {
    dispatch(removeFromCart(variantId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Empty
          image={<ShoppingOutlined className="text-6xl text-gray-300" />}
          description={
            <span className="text-text-secondary-light dark:text-text-secondary-dark">
              {t('shop.emptyCart')}
            </span>
          }
        >
          <Button type="primary" onClick={() => navigate('/shop')}>
            {t('shop.continueShopping')}
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {t('shop.cart')}
        </h1>
        <Popconfirm
          title={t('shop.clearCartConfirm')}
          onConfirm={() => dispatch(clearCart())}
          okText={t('common.confirm')}
          cancelText={t('common.cancel')}
        >
          <Button danger type="text">
            {t('shop.clearCart')}
          </Button>
        </Popconfirm>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.variantId}
            className="flex gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-2xl"
          >
            {/* Product Image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
                {item.productName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: item.colorCode }}
                />
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {item.color} / {item.size}
                </span>
              </div>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                SKU: {item.sku}
              </p>
            </div>

            {/* Quantity & Price */}
            <div className="flex flex-col items-end justify-between">
              <p className="font-semibold text-primary">
                {formatPrice(item.price * item.quantity)}
              </p>
              <div className="flex items-center gap-2">
                <InputNumber
                  size="small"
                  min={1}
                  value={item.quantity}
                  onChange={(value) => handleQuantityChange(item.variantId, value)}
                  className="w-20"
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(item.variantId)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Order Summary */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          {t('shop.orderSummary')}
        </h2>
        
        <div className="space-y-2">
          <div className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark">
            <span>{t('shop.subtotal')}</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark">
            <span>{t('shop.shipping')}</span>
            <span>{t('shop.freeShipping')}</span>
          </div>
        </div>
        
        <Divider className="my-4" />
        
        <div className="flex justify-between text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
          <span>{t('shop.total')}</span>
          <span className="text-primary">{formatPrice(cartTotal)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/shop')}
          className="sm:flex-1"
        >
          {t('shop.continueShopping')}
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/shop/checkout')}
          className="sm:flex-1"
        >
          {t('shop.checkout')}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
