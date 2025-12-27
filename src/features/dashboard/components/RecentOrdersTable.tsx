import { useTranslation } from 'react-i18next';
import { Table, Tag, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useOrders } from '../../../hooks/useQueries';
import type { Order } from '../../../types';
import dayjs from 'dayjs';

const RecentOrdersTable = () => {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useOrders({ limit: 5 });

  const statusColors: Record<string, string> = {
    pending: 'orange',
    processing: 'blue',
    shipped: 'cyan',
    delivered: 'green',
    cancelled: 'red',
  };

  const statusLabels: Record<string, string> = {
    pending: '待處理',
    processing: '處理中',
    shipped: '已出貨',
    delivered: '已送達',
    cancelled: '已取消',
  };

  const columns: ColumnsType<Order> = [
    {
      title: '訂單編號',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text) => (
        <span className="font-mono text-sm text-primary">{text}</span>
      ),
    },
    {
      title: '分店',
      dataIndex: 'storeName',
      key: 'storeName',
      render: (text) => (
        <span className="text-sm">{text}</span>
      ),
    },
    {
      title: '金額',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value) => (
        <span className="font-medium">NT$ {value.toLocaleString()}</span>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>
      ),
    },
    {
      title: '時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {dayjs(date).format('MM/DD HH:mm')}
        </span>
      ),
    },
  ];

  // 手機版卡片渲染
  const renderMobileCard = (order: Order) => (
    <Card
      key={order.id}
      className="mb-3 rounded-xl"
      bodyStyle={{ padding: '12px' }}
    >
      <div className="space-y-2">
        {/* Header: Order Number + Status */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-primary font-medium">
            {order.orderNumber}
          </span>
          <Tag color={statusColors[order.status]}>
            {statusLabels[order.status]}
          </Tag>
        </div>

        {/* Store + Time */}
        <div className="flex items-center justify-between text-sm text-text-secondary-light dark:text-text-secondary-dark">
          <span>{order.storeName}</span>
          <span>{dayjs(order.createdAt).format('MM/DD HH:mm')}</span>
        </div>

        {/* Amount */}
        <div className="text-right">
          <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
            NT$ {order.totalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-6">
        {t('dashboard.recentOrders')}
      </h3>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          size="middle"
          className="nex-table"
        />
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">載入中...</div>
        ) : (
          orders?.map(renderMobileCard)
        )}
      </div>
    </div>
  );
};

export default RecentOrdersTable;
