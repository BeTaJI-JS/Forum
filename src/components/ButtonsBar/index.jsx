import { useMemo } from "react";
import { HeaderControls } from "./styles";
import { useSelector } from "react-redux";

const ButtonsBar = ({
  onItemCreate,
  onFolderCreate,
  onEditItem,
  selectedRows,
  customButton,
  titleButton,
  onCustomClick,
  disabledCustomButton,
}) => {
  const authUser = useSelector((state) => state.auth);

  const disabledRules = useMemo(() => {
    return !authUser || selectedRows?.length > 1;
  }, [authUser, selectedRows]);

  return (
    <>
      <HeaderControls>
        <div>Каталог форумов</div>
        {onItemCreate && (
          <button onClick={onItemCreate} disabled={disabledRules}>
            Добавить форум
          </button>
        )}
        {onEditItem && (
          <button onClick={onEditItem} disabled={disabledRules}>
            Редактировать
          </button>
        )}
        {onFolderCreate && (
          <button onClick={onFolderCreate} disabled={disabledRules}>
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
