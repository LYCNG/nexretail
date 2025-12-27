import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

interface ProductFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const ProductFilters = ({
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: ProductFiltersProps) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Input
        placeholder={t('products.searchPlaceholder')}
        prefix={<SearchOutlined className="text-gray-400" />}
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-64"
        allowClear
      />
      
      <Space>
        <Select
          placeholder={t('products.filterCategory')}
          onChange={onCategoryChange}
          className="w-40"
          defaultValue="all"
        >
          <Option value="all">{t('products.allCategories')}</Option>
          <Option value="tops">{t('categories.tops')}</Option>
          <Option value="bottoms">{t('categories.bottoms')}</Option>
          <Option value="dresses">{t('categories.dresses')}</Option>
          <Option value="outerwear">{t('categories.outerwear')}</Option>
          <Option value="accessories">{t('categories.accessories')}</Option>
        </Select>

        <Select
          placeholder={t('products.filterStatus')}
          onChange={onStatusChange}
          className="w-40"
          defaultValue=""
        >
          <Option value="">{t('products.allStatus')}</Option>
          <Option value="inStock">{t('products.inStock')}</Option>
          <Option value="lowStock">{t('products.lowStock')}</Option>
          <Option value="outOfStock">{t('products.outOfStock')}</Option>
        </Select>
      </Space>
    </div>
  );
};

export default ProductFilters;
