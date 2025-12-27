import { useTranslation } from 'react-i18next';
import UserManagement from './components/UserManagement';
import SystemSettings from './components/SystemSettings';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {t('settings.title')}
        </h1>
    
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <UserManagement />
        <SystemSettings />
      </div>
    </div>
  );
};

export default Settings;
