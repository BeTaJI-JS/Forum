import { useMemo } from "react";
import { HeaderControls } from "./styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";

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
          <button onClick={onItemCreate} disabled={disabledRules || selectedRows.length >= 1}>
            Добавить форум
          </button>
        )}
        {onEditItem && (
          <button onClick={onEditItem} disabled={disabledRules}>
            Редактировать
          </button>
        )}
        {onFolderCreate && (
          <button onClick={onFolderCreate} disabled={disabledRules || selectedRows.length >= 1}>
            Добавить Папку
          </button>
        )}
        {customButton && (
          <button disabled={disabledCustomButton} onClick={onCustomClick}>
            {titleButton}
          </button>
        )}
      </HeaderControls>
    </>
  );
};

export default ButtonsBar;
