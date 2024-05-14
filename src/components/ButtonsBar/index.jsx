import { useMemo, useCallback } from "react";
import { HeaderControls } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../store/forums";
import { nanoid } from "nanoid";

const ButtonsBar = ({
  onItemCreate,
  onFolderCreate,
  onEditItem,
  selectedRows,
}) => {
  const authUser = useSelector((state) => state.auth);

  const disabledRules = useMemo(() => {
    return !authUser || selectedRows.length > 1;
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
        <button onClick={onEditItem} disabled={disabledRules}>
          Редактировать
        </button>
        {onFolderCreate && (
          <button onClick={onFolderCreate} disabled={disabledRules}>
            Добавить Папку
          </button>
        )}
      </HeaderControls>
    </>
  );
};

export default ButtonsBar;
