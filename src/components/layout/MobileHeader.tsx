import { useTranslation } from 'react-i18next';
import { Button, Tooltip, Dropdown } from 'antd';
import { MenuOutlined, SunOutlined, MoonOutlined, HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import type { MenuProps } from 'antd';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const languageItems: MenuProps['items'] = [
    { key: 'zh-TW', label: '繁體中文', onClick: () => handleLanguageChange('zh-TW') },
    { key: 'en', label: 'English', onClick: () => handleLanguageChange('en') },
  ];

  return (
    <header className="lg:hidden sticky top-0 z-50 h-14 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 transition-colors duration-300">
      {/* Left: Menu Button + Logo */}
      <div className="flex items-center gap-3">
        <Button
          type="text"
          icon={<MenuOutlined className="text-lg" />}
          onClick={onMenuClick}
          className="flex items-center justify-center"
        />
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-white font-bold text-sm">SL</span>
        </div>
        <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">
          {t('app.tagline')}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Language Switcher */}
        <Dropdown menu={{ items: languageItems }} placement="bottomRight">
          <Button
            type="text"
            shape="circle"
            icon={<GlobalOutlined />}
            className="flex items-center justify-center text-text-primary-light dark:text-text-primary-dark"
          />
        </Dropdown>

        <Tooltip title={themeMode === 'light' ? t('theme.dark') : t('theme.light')}>
          <Button
            type="text"
            shape="circle"
            icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={handleToggleTheme}
            className="flex items-center justify-center text-text-primary-light dark:text-text-primary-dark"
          />
        </Tooltip>
        <Tooltip title={t('nav.home')}>
          <Button
            type="text"
            shape="circle"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            className="flex items-center justify-center text-text-primary-light dark:text-text-primary-dark"
          />
        </Tooltip>
      </div>
    </header>
  );
};

export default MobileHeader;

