import React, { useCallback, useMemo } from "react";

import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

export const ModalForm = ({
  children,
  disableFooter,
  onClose,
  title,
  isOpen,
  onSave,
}) => {
  const dispatch = useDispatch();

  const onCancel = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [dispatch, onClose]);

  const onSaveHandler = useCallback(() => {
    if (onSave) {
      onSave();
    }
  }, [dispatch, onSave]);

  const footer = useMemo(
    () => [
      ...(!disableFooter
        ? [
            <Button key="cancel" onClick={onCancel}>
              Отменить
            </Button>,
            <Button
              htmlType="submit"
              key="submit"
              type="primary"
              onClick={onSaveHandler}
            >
              Сохранить
            </Button>,
          ]
        : []),
    ],
    [onCancel, disableFooter],
  );

  return (
    <Modal
      afterClose={onClose}
      footer={footer}
      open={isOpen}
      title={title}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};
