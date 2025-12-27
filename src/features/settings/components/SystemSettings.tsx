import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Switch, Button, message, Divider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Option } = Select;

const SystemSettings = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success(t('common.success'));
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <SettingOutlined className="text-xl text-accent" />
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          {t('settings.systemSettings')}
        </h3>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          companyName: 'NexRetail 服飾集團',
          timezone: 'Asia/Taipei',
          currency: 'TWD',
          language: 'zh-TW',
          emailNotifications: true,
          lowStockAlert: true,
          dailyReport: false,
        }}
        className="max-w-lg"
      >
        <Form.Item
          name="companyName"
          label={t('settings.companyName')}
        >
          <Input />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="timezone"
            label={t('settings.timezone')}
          >
            <Select>
              <Option value="Asia/Taipei">台北 (UTC+8)</Option>
              <Option value="Asia/Tokyo">東京 (UTC+9)</Option>
              <Option value="Asia/Hong_Kong">香港 (UTC+8)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="currency"
            label={t('settings.currency')}
          >
            <Select>
              <Option value="TWD">新台幣 (NT$)</Option>
              <Option value="USD">美元 ($)</Option>
              <Option value="CNY">人民幣 (¥)</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="language"
          label={t('settings.language')}
        >
          <Select>
            <Option value="zh-TW">繁體中文</Option>
            <Option value="en">English</Option>
          </Select>
        </Form.Item>

        <Divider />

        <h4 className="text-base font-medium text-text-primary-light dark:text-text-primary-dark mb-4">
          {t('settings.notifications')}
        </h4>

        <Form.Item
          name="emailNotifications"
          label={t('settings.emailNotifications')}
          valuePropName="checked"
        >
          <Switch className="bg-gray-300" />
        </Form.Item>

        <Form.Item
          name="lowStockAlert"
          label={t('settings.lowStockAlert')}
          valuePropName="checked"
        >
          <Switch className="bg-gray-300" />
        </Form.Item>

        <Form.Item
          name="dailyReport"
          label={t('settings.dailyReport')}
          valuePropName="checked"
        >
          <Switch className="bg-gray-300" />
        </Form.Item>

        <Form.Item className="mt-6">
          <Button
            type="primary"
            onClick={handleSave}
            className="bg-primary hover:bg-primary-600"
          >
            {t('settings.save')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SystemSettings;
