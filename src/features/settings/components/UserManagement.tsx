import { useTranslation } from 'react-i18next';
import { Table, Select, Tag, message, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useUsers, useUpdateUserRole } from '../../../hooks/useQueries';
import type { User } from '../../../types';
import dayjs from 'dayjs';
import { TeamOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserManagement = () => {
  const { t } = useTranslation();
  const { data: users, isLoading } = useUsers();
  const updateRole = useUpdateUserRole();

  const roleColors: Record<string, string> = {
    admin: 'red',
    manager: 'blue',
    viewer: 'green',
  };

  const handleRoleChange = async (userId: string, role: User['role']) => {
    try {
      await updateRole.mutateAsync({ userId, role });
      message.success(t('common.success'));
    } catch {
      message.error(t('common.failed'));
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: t('settings.userName'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
            {text.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
              {text}
            </p>
            {record.storeName && (
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                {record.storeName}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: t('settings.email'),
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {text}
        </span>
      ),
    },
    {
      title: t('settings.role'),
      dataIndex: 'role',
      key: 'role',
      render: (role, record) => (
        <Select
          value={role}
          onChange={(value) => handleRoleChange(record.id, value)}
          className="w-28"
          size="small"
          loading={updateRole.isPending}
        >
          <Option value="admin">
            <Tag color={roleColors.admin}>{t('settings.admin')}</Tag>
          </Option>
          <Option value="manager">
            <Tag color={roleColors.manager}>{t('settings.manager')}</Tag>
          </Option>
          <Option value="viewer">
            <Tag color={roleColors.viewer}>{t('settings.viewer')}</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: t('settings.lastLogin'),
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      render: (date) => (
        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {dayjs(date).format('YYYY/MM/DD HH:mm')}
        </span>
      ),
    },
  ];

  // 手機版卡片渲染
  const renderMobileCard = (user: User) => (
    <Card
      key={user.id}
      className="mb-3 rounded-xl"
      bodyStyle={{ padding: '12px' }}
    >
      <div className="space-y-3">
        {/* Header: Avatar + Name + Role */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                {user.name}
              </p>
              {user.storeName && (
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  {user.storeName}
                </p>
              )}
            </div>
          </div>
          <Select
            value={user.role}
            onChange={(value) => handleRoleChange(user.id, value)}
            className="w-24"
            size="small"
            loading={updateRole.isPending}
          >
            <Option value="admin">
              <Tag color={roleColors.admin}>{t('settings.admin')}</Tag>
            </Option>
            <Option value="manager">
              <Tag color={roleColors.manager}>{t('settings.manager')}</Tag>
            </Option>
            <Option value="viewer">
              <Tag color={roleColors.viewer}>{t('settings.viewer')}</Tag>
            </Option>
          </Select>
        </div>

        {/* Email + Last Login */}
        <div className="flex flex-col gap-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          <span className="truncate">{user.email}</span>
          <span>
            {t('settings.lastLogin')}: {dayjs(user.lastLoginAt).format('MM/DD HH:mm')}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <TeamOutlined className="text-xl text-secondary" />
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          {t('settings.userManagement')}
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 位使用者`,
          }}
          className="nex-table"
        />
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">載入中...</div>
        ) : (
          users?.map(renderMobileCard)
        )}
      </div>
    </div>
  );
};

export default UserManagement;
