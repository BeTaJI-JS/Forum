import { useMemo, useCallback } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, HeaderControls, TextTag } from "./styles";

const ButtonsBar = ({
  customButton,
  disabledCustomButton,
  onBackNavigate,
  onCustomClick,
  onEditItem,
  onFolderCreate,
  onItemCreate,
  selectedRows,
  titleButton,
}) => {
  const authUser = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const disabledRules = useMemo(() => !authUser || selectedRows?.length > 1, [authUser, selectedRows]);

  const backBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <HeaderControls>
      {!onBackNavigate ? <TextTag>Наш клуб</TextTag> : <Button onClick={backBtn}>Назад к форумам</Button>}
      {onItemCreate && (
        <Button onClick={onItemCreate} disabled={disabledRules || selectedRows.length >= 1} className=''>
          Добавить форум
        </Button>
      )}
      {onEditItem && (
        <Button onClick={onEditItem} disabled={selectedRows?.length === 0 || disabledRules}>
          Редактировать
        </Button>
      )}
      {onFolderCreate && (
        <Button onClick={onFolderCreate} disabled={disabledRules || selectedRows.length >= 1}>
          Добавить Папку
        </Button>
      )}
      {customButton && (
        <Button disabled={disabledCustomButton} onClick={onCustomClick}>
          {titleButton}
        </Button>
      )}
    </HeaderControls>
  );
};

export default ButtonsBar;
