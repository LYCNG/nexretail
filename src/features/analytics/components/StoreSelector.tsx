import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useStores } from '../../../hooks/useQueries';

const { Option } = Select;

interface StoreSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const StoreSelector = ({ value, onChange }: StoreSelectorProps) => {
  const { t } = useTranslation();
  const { data: stores } = useStores();

  return (
    <Select
      value={value}
      onChange={onChange}
      className="w-64"
      placeholder={t('analytics.selectStore')}
      suffixIcon={<ShopOutlined />}
    >
      <Option value="all">{t('analytics.allStores')}</Option>
      {stores?.map((store) => (
        <Option key={store.id} value={store.id}>
          {store.name}
        </Option>
      ))}
    </Select>
  );
};

export default StoreSelector;
