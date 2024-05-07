import { useMemo, useCallback } from "react";
import { HeaderControls } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../store/forumsSlice";
import { nanoid } from "nanoid";

const ButtonsBar = ({
  onItemCreate,
  onFolderCreate,
  onEditItem,
  selectedRows,
}) => {
  const dispatch = useDispatch(); // TODO тоже убрать отсюда позже
  console.log("selectedRows buttonsBar", selectedRows);
  const authUser = useSelector((state) => state.auth);
  console.log("authUser", authUser);
  const disabledRules = useMemo(() => {
    return !authUser || selectedRows.length > 1;
  }, [authUser, selectedRows]);

  // const addElem = useCallback(
  //   () =>
  //     dispatch(
  //       addItem({
  //         title: "Заголовок записи",
  //         text: "Текс записи",
  //         id: nanoid(),
  //         key: nanoid(),
  //         isFolder: false,
  //         parentId: null,
  //       }),
  //     ),
  //   [dispatch],
  // );

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
