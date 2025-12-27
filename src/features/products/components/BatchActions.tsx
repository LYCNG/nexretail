import { useTranslation } from 'react-i18next';
import { Button, Space, Modal, InputNumber, message } from 'antd';
import {
  UploadOutlined,
  StopOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useUpdateProductPublish, useUpdateProductPrices } from '../../../hooks/useQueries';

interface BatchActionsProps {
  selectedIds: string[];
  onClear: () => void;
}

const BatchActions = ({ selectedIds, onClear }: BatchActionsProps) => {
  const { t } = useTranslation();
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  
  const updatePublish = useUpdateProductPublish();
  const updatePrices = useUpdateProductPrices();

  const handlePublish = async (isPublished: boolean) => {
    try {
      await updatePublish.mutateAsync({ ids: selectedIds, isPublished });
      message.success(t('common.success'));
      onClear();
    } catch {
      message.error(t('common.failed'));
    }
  };

  const handlePriceChange = async () => {
    if (priceChange === null) return;
    
    try {
      await updatePrices.mutateAsync({ ids: selectedIds, priceChange });
      message.success(t('common.success'));
      setPriceModalOpen(false);
      setPriceChange(null);
      onClear();
    } catch {
      message.error(t('common.failed'));
    }
  };

  if (selectedIds.length === 0) return null;

  return (
    <>
      <div className="bg-primary/10 dark:bg-primary/20 rounded-lg px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
          {t('products.selected')} {selectedIds.length} {t('products.items')}
        </span>
        <Space>
          <Button
            icon={<UploadOutlined />}
            onClick={() => handlePublish(true)}
            loading={updatePublish.isPending}
          >
            {t('products.publish')}
          </Button>
          <Button
            icon={<StopOutlined />}
            onClick={() => handlePublish(false)}
            loading={updatePublish.isPending}
          >
            {t('products.unpublish')}
          </Button>
          <Button
            icon={<DollarOutlined />}
            onClick={() => setPriceModalOpen(true)}
            type="primary"
            className="bg-primary hover:bg-primary-600"
          >
            {t('products.batchPriceChange')}
          </Button>
        </Space>
      </div>

      <Modal
        title={t('products.batchPriceChange')}
        open={priceModalOpen}
        onOk={handlePriceChange}
        onCancel={() => setPriceModalOpen(false)}
        okButtonProps={{ className: 'bg-primary hover:bg-primary-600' }}
        confirmLoading={updatePrices.isPending}
      >
        <div className="py-4">
          <p className="mb-4 text-text-secondary-light dark:text-text-secondary-dark">
            將調整 {selectedIds.length} 件商品的價格
          </p>
          <Space>
            <span>價格調整:</span>
            <InputNumber
              value={priceChange}
              onChange={(value) => setPriceChange(value)}
              placeholder="輸入調整金額"
              prefix="NT$"
              className="w-48"
            />
            <span className="text-xs text-gray-500">(正數為漲價，負數為降價)</span>
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default BatchActions;
