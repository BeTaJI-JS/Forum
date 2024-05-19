import { useMemo } from "react";
import { Button, HeaderControls } from "./styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

const ButtonsBar = ({
  onItemCreate,
  onFolderCreate,
  onEditItem,
  onBackNavigate,
  selectedRows,
  customButton,
  titleButton,
  onCustomClick,
  disabledCustomButton,
}) => {
  const authUser = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const disabledRules = useMemo(() => {
    return !authUser || selectedRows?.length > 1;
  }, [authUser, selectedRows]);

  const backBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <HeaderControls>
        {!onBackNavigate ? <div>Каталог форумов</div> : <button onClick={backBtn}>Назад к форумам</button>}
        {onItemCreate && (
          <Button onClick={onItemCreate} disabled={disabledRules || selectedRows.length >= 1} className=''>
            Добавить форум
          </Button>
        )}
        {onEditItem && (
          <Button onClick={onEditItem} disabled={disabledRules}>
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
    </>
  );
};

export default ButtonsBar;
