import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  LineChartOutlined,
  SettingOutlined,
  HomeOutlined,
  CloseOutlined,
} from '@ant-design/icons';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { t } = useTranslation();

  const navItems = [
    { path: '/admin', icon: <DashboardOutlined />, label: t('nav.dashboard') },
    { path: '/admin/products', icon: <ShoppingOutlined />, label: t('nav.products') },
    { path: '/admin/analytics', icon: <LineChartOutlined />, label: t('nav.analytics') },
    { path: '/admin/settings', icon: <SettingOutlined />, label: t('nav.settings') },
    { path: '/', icon: <HomeOutlined />, label: t('nav.home'), external: true },
  ];

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-xl">SL</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient-warm">{t('app.tagline')}</h1>
          </div>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            className="lg:hidden"
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-secondary to-accent flex items-center justify-center text-white font-semibold">
            王
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
              王大明
            </p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              管理員
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

