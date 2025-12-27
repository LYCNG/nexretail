import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { 
  Button, 
  Form, 
  Input, 
  Divider, 
  Result,
  Card 
} from 'antd';
import { 
  CheckCircleOutlined,
  ShopOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectCartItems, selectCartTotal, clearCart } from '../../store/slices/cartSlice';
import { submitOrder } from '../../mocks/api';
import type { CheckoutForm, OrderResult } from '../../types';

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<CheckoutForm>();
  
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: (values: CheckoutForm) => submitOrder(cartItems, values),
    onSuccess: (result) => {
      setOrderResult(result);
      dispatch(clearCart());
    },
  });

  const formatPrice = (price: number) => {
    return `NT$ ${price.toLocaleString()}`;
  };

  // Redirect if cart is empty and no order result
  if (cartItems.length === 0 && !orderResult) {
    return (
      <div className="text-center py-16">
        <Result
          status="warning"
          title={t('shop.emptyCart')}
          extra={
            <Button type="primary" onClick={() => navigate('/shop')}>
              {t('shop.continueShopping')}
            </Button>
          }
        />
      </div>
    );
  }

  // Order success page
  if (orderResult) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <Result
          icon={<CheckCircleOutlined className="text-secondary" style={{ fontSize: 72 }} />}
          title={
            <span className="text-text-primary-light dark:text-text-primary-dark">
              {t('shop.orderSuccess')}
            </span>
          }
          subTitle={
            <div className="space-y-2 text-text-secondary-light dark:text-text-secondary-dark">
              <p>{t('shop.orderNumber')}: <strong>{orderResult.orderNumber}</strong></p>
              <p>{t('shop.total')}: <strong className="text-primary">{formatPrice(orderResult.totalAmount)}</strong></p>
            </div>
          }
          extra={[
            <Button 
              type="primary" 
              key="shop" 
              icon={<ShopOutlined />}
              onClick={() => navigate('/shop')}
            >
              {t('shop.backToShop')}
            </Button>,

          ]}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/shop/cart')}
        className="mb-4 p-0"
      >
        {t('shop.backToCart')}
      </Button>

      <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
        {t('shop.checkout')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card className="dark:bg-surface-dark">
            <h2 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
              {t('shop.customerInfo')}
            </h2>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                name="name"
                label={t('shop.name')}
                rules={[{ required: true, message: t('shop.nameRequired') }]}
              >
                <Input size="large" placeholder={t('shop.namePlaceholder')} />
              </Form.Item>

              <Form.Item
                name="email"
                label={t('shop.email')}
                rules={[
                  { required: true, message: t('shop.emailRequired') },
                  { type: 'email', message: t('shop.emailInvalid') },
                ]}
              >
                <Input size="large" placeholder={t('shop.emailPlaceholder')} />
              </Form.Item>

              <Form.Item
                name="phone"
                label={t('shop.phone')}
                rules={[{ required: true, message: t('shop.phoneRequired') }]}
              >
                <Input size="large" placeholder={t('shop.phonePlaceholder')} />
              </Form.Item>

              <Form.Item
                name="address"
                label={t('shop.address')}
                rules={[{ required: true, message: t('shop.addressRequired') }]}
              >
                <Input.TextArea 
                  size="large" 
                  rows={3} 
                  placeholder={t('shop.addressPlaceholder')} 
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isPending}
                className="w-full mt-4"
              >
                {t('shop.submitOrder')}
              </Button>
            </Form>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="dark:bg-surface-dark sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
              {t('shop.orderSummary')}
            </h2>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.variantId} className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-text-primary-light dark:text-text-primary-dark">
                      {item.productName}
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {item.color} / {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <Divider className="my-4" />

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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
