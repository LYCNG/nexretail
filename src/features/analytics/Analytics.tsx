import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StoreSelector from './components/StoreSelector';
import Leaderboard from './components/Leaderboard';
import WeeklyHeatmap from './components/WeeklyHeatmap';

const Analytics = () => {
  const { t } = useTranslation();
  const [selectedStore, setSelectedStore] = useState<string>('all');

  return (
    <div className="space-y-6">
      {/* Page Title & Store Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
            {t('analytics.title')}
          </h1>
    
        </div>
        <StoreSelector value={selectedStore} onChange={setSelectedStore} />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Leaderboard storeId={selectedStore !== 'all' ? selectedStore : undefined} />
        <WeeklyHeatmap storeId={selectedStore !== 'all' ? selectedStore : undefined} />
      </div>
    </div>
  );
};

export default Analytics;
