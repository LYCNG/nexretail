import { useTranslation } from 'react-i18next';
import { Image, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TopProduct } from '../../../types';
import { useTopProducts } from '../../../hooks/useQueries';
import { TrophyOutlined } from '@ant-design/icons';

interface LeaderboardProps {
  storeId?: string;
}

const Leaderboard = ({ storeId }: LeaderboardProps) => {
  const { t } = useTranslation();
  const { data: topProducts, isLoading } = useTopProducts(storeId);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
  };

  const columns: ColumnsType<TopProduct> = [
    {
      title: t('analytics.rank'),
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank) => (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(rank)}`}
        >
          {rank}
        </div>
      ),
    },
    {
      title: t('analytics.productName'),
      key: 'product',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.image}
            alt={record.productName}
            width={48}
            height={48}
            className="rounded-lg object-cover"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJpAN46+QDOAAAAABJRU5ErkJggg=="
          />
          <span className="font-medium">{record.productName}</span>
        </div>
      ),
    },
    {
      title: t('analytics.unitsSold'),
      dataIndex: 'unitsSold',
      key: 'unitsSold',
      render: (value) => (
        <span className="font-semibold text-primary">{value.toLocaleString()}</span>
      ),
    },
    {
      title: t('analytics.totalRevenue'),
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => (
        <span className="font-medium">NT$ {value.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <TrophyOutlined className="text-xl text-accent" />
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          {t('analytics.top10')}
        </h3>
      </div>
      <Table
        columns={columns}
        dataSource={topProducts}
        rowKey="rank"
        loading={isLoading}
        pagination={false}
        size="middle"
        className="nex-table"
      />
    </div>
  );
};

export default Leaderboard;
