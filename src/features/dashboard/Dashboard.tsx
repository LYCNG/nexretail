import { useTranslation } from 'react-i18next';
import KpiSection from './components/KpiSection';
import SalesTrendChart from './components/SalesTrendChart';
import TopProductsChart from './components/TopProductsChart';
import RecentOrdersTable from './components/RecentOrdersTable';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {t('dashboard.title')}
        </h1>
        
      </div>

      {/* KPI Cards */}
      <KpiSection />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTrendChart />
        <TopProductsChart />
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable />
    </div>
  );
};

export default Dashboard;
