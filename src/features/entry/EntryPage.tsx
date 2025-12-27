import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip, Dropdown } from 'antd';
import { ShopOutlined, DashboardOutlined, SunOutlined, MoonOutlined, GlobalOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import type { MenuProps } from 'antd';

const EntryPage = () => {
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300 flex flex-col">
      {/* Header */}
      <header className="flex justify-end gap-2 p-4">
        {/* Language Switcher */}
        <Dropdown menu={{ items: languageItems }} placement="bottomRight">
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={<GlobalOutlined />}
            className="text-text-primary-light dark:text-text-primary-dark"
          />
        </Dropdown>

        <Tooltip title={themeMode === 'light' ? t('theme.dark') : t('theme.light')}>
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={handleToggleTheme}
            className="text-text-primary-light dark:text-text-primary-dark"
          />
        </Tooltip>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-4xl">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-5xl">SL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-warm">
              {t('app.name')}
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
              {t('app.tagline')}
            </p>
          </div>

          {/* Mode Selection */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark">
              {t('entry.selectMode')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Customer Mode */}
              <button
                onClick={() => navigate('/shop')}
                className="group p-8 rounded-3xl bg-surface-light dark:bg-surface-dark border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ShopOutlined className="text-3xl text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
                    {t('entry.customerMode')}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {t('entry.customerDesc')}
                  </p>
                </div>
              </button>

              {/* Admin Mode */}
              <button
                onClick={() => navigate('/admin')}
                className="group p-8 rounded-3xl bg-surface-light dark:bg-surface-dark border-2 border-transparent hover:border-secondary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <DashboardOutlined className="text-3xl text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
                    {t('entry.adminMode')}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {t('entry.adminDesc')}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-text-secondary-light dark:text-text-secondary-dark text-sm">
         <a
            href="https://sharklian-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
              {"Copyright © " + new Date().getFullYear()}{" "} SharkLian Studio
          </a>
      </footer>
    </div>
  );
};

export default EntryPage;
