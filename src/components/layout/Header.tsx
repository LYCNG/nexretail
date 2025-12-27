import { useTranslation } from 'react-i18next';
import { Button, Tooltip, Dropdown } from 'antd';
import { SunOutlined, MoonOutlined, GlobalOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import type { MenuProps } from 'antd';

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const languageItems: MenuProps['items'] = [
    {
      key: 'zh-TW',
      label: '繁體中文',
      onClick: () => handleLanguageChange('zh-TW'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => handleLanguageChange('en'),
    },
  ];

  return (
    <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-300">
      {/* Welcome Message */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          {t('dashboard.welcome')}，{currentUser?.name}！
        </h2>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <Dropdown menu={{ items: languageItems }} placement="bottomRight">
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={<GlobalOutlined />}
            className="flex items-center justify-center text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          >
          </Button>
        </Dropdown>

        {/* Theme Toggle */}
        <Tooltip title={themeMode === 'light' ? t('theme.dark') : t('theme.light')}>
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={handleToggleTheme}
            className="flex items-center justify-center text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800"
          />
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;

