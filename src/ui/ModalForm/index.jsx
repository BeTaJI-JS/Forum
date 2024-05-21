import { useCallback, useMemo } from "react";

import { Button, Modal } from "antd";

const ModalForm = ({ children, disableFooter, isOpen, onClose, onSave, title }) => {
  const onCancel = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onSaveHandler = useCallback(() => {
    if (onSave) {
      onSave();
    }
  }, [onSave]);

  const footer = useMemo(
    () => [
      ...(!disableFooter
        ? [
            <Button key='cancel' onClick={onCancel}>
              Отменить
            </Button>,
            <Button htmlType='submit' key='submit' type='primary' onClick={onSaveHandler}>
              Сохранить
            </Button>,
          ]
        : []),
    ],
    [onCancel, onSaveHandler, disableFooter],
  );

  return (
    <Modal afterClose={onClose} footer={footer} open={isOpen} title={title} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default ModalForm;
