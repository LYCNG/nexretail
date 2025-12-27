import { useTranslation } from 'react-i18next';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import KpiCard from '../../../components/common/KpiCard';
import { useKpiData } from '../../../hooks/useQueries';
import { Skeleton } from 'antd';

const KpiSection = () => {
  const { t } = useTranslation();
  const { data: kpiData, isLoading } = useKpiData();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        ))}
      </div>
    );
  }

  if (!kpiData) return null;

  const kpis = [
    {
      title: t('dashboard.totalRevenue'),
      value: kpiData.totalRevenue,
      change: kpiData.revenueChange,
      icon: <DollarOutlined />,
      prefix: 'NT$',
    },
    {
      title: t('dashboard.totalOrders'),
      value: kpiData.totalOrders,
      change: kpiData.ordersChange,
      icon: <ShoppingCartOutlined />,
    },
    {
      title: t('dashboard.avgOrderValue'),
      value: kpiData.avgOrderValue,
      change: kpiData.aovChange,
      icon: <UserOutlined />,
      prefix: 'NT$',
    },
    {
      title: t('dashboard.inventoryTurnover'),
      value: kpiData.inventoryTurnover,
      change: kpiData.turnoverChange,
      icon: <SyncOutlined />,
      suffix: '次',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <KpiCard
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          changeLabel={t('dashboard.vsLastMonth')}
          icon={kpi.icon}
          prefix={kpi.prefix}
          suffix={kpi.suffix}
        />
      ))}
    </div>
  );
};

export default KpiSection;
