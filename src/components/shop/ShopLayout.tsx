import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Tooltip, Dropdown } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined, SunOutlined, MoonOutlined, GlobalOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectCartItemCount } from '../../store/slices/cartSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import type { MenuProps } from 'antd';

const ShopLayout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector(selectCartItemCount);
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - 手機只顯示 SL，桌面顯示完整標題 */}
            <Link to="/shop" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">SL</span>
              </div>
              <h1 className="hidden sm:block text-xl font-bold text-gradient-warm">
                {t('shop.title')}
              </h1>
            </Link>

            {/* Actions - 全部保留 */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <Dropdown menu={{ items: languageItems }} placement="bottomRight">
                <Button
                  type="text"
                  shape="circle"
                  icon={<GlobalOutlined />}
                  className="flex items-center justify-center text-text-primary-light dark:text-text-primary-dark"
                />
              </Dropdown>

              {/* Theme Toggle */}
              <Tooltip title={themeMode === 'light' ? t('theme.dark') : t('theme.light')}>
                <Button
                  type="text"
                  shape="circle"
                  icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
                  onClick={handleToggleTheme}
                  className="flex items-center justify-center text-text-primary-light dark:text-text-primary-dark"
                />
              </Tooltip>

              
              <Badge count={cartItemCount} size="small" offset={[-2, 2]}>
                <Button
                  type="text"
                  icon={<ShoppingCartOutlined className="text-xl" />}
                  onClick={() => navigate('/shop/cart')}
                  className="flex items-center justify-center w-10 h-10"
                />
              </Badge>
              
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/')}
                className="text-text-secondary-light dark:text-text-secondary-dark"
              >
                <span className="hidden sm:inline">{t('shop.home')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-4 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-secondary-light dark:text-text-secondary-dark">
           <a
            href="https://sharklian-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
              {"Copyright © " + new Date().getFullYear()}{" "} SharkLian Studio
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;

