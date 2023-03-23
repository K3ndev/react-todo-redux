import { FormEvent, useRef } from "react";
import DOMPurify from "dompurify";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/todoStore";
import donaAvatar from "../../../assets/dona_Avatar.svg";
import {
  addCategory,
  changeIsUsed,
  removeCategory,
} from "../../store/feutures/reservationSlice";
// type
type todoListType = {
  id: number;
  isChecked: boolean;
  list: string;
};
type categoryType = {
  id: number;
  categoryName: string;
  isUsed: boolean;
  todoList: todoListType[];
};
export function Sidebar() {
  // states
  const inputRef = useRef<HTMLInputElement>(null);
  const { categoryList } = useSelector((state: RootState) => {
    return state.reservations;
  });
  const dispatch = useDispatch();

  // get uniqueID
  const getUniqueId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  };

  // checker, will return boolean
  const checkerCategory = (argCategoryName: string) => {
    return categoryList.some((item: categoryType) => {
      return item.categoryName.toLowerCase() === argCategoryName.toLowerCase();
    });
  };

  const onSubmitHandler = (
    event: FormEvent<HTMLFormElement>,
    argInput: string
  ) => {
    event.preventDefault();

    if (inputRef.current) {
      if (inputRef.current.value === "") {
        return;
      }
      if (DOMPurify.sanitize(inputRef.current.value) === "") {
        inputRef.current.value = "";
        return;
      }
    }

    if (!checkerCategory(argInput)) {
      const newCategory = {
        id: getUniqueId(),
        categoryName: argInput,
        isUsed: false,
        todoList: [],
      };
      dispatch(addCategory(newCategory));
      dispatch(changeIsUsed(newCategory));
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onClickHandler = (argCategory: categoryType) => {
    dispatch(changeIsUsed(argCategory));
  };

  const onDeleteClickHandler = (argCategory: categoryType) => {
    dispatch(removeCategory(argCategory.id));
  };

  return (
    <aside className="hidden h-[90vh] w-[44%] justify-center rounded-[20px] bg-white p-10 md:w-[34%] lg:inline-flex">
      <div className="scrollbar-hide h-[82vh] w-full overflow-auto">
        <div className="flex max-w-full flex-col gap-4">
          {/* list */}
          {categoryList.map((item: categoryType) => {
            return (
              <div key={item.categoryName} className="">
                <div
                  className={`${
                    item.isUsed && "bg-[#EAEDEE]"
                  } flex h-auto cursor-pointer items-center justify-between rounded-[20px] py-5 px-6`}
                  onClick={() => onClickHandler(item)}
                >
                  <div className={`flex items-center`}>
                    <img
                      src={donaAvatar}
                      alt="dona_Avatar"
                      className="max-h-[15px] max-w-[15px]"
                      width="200"
                      height="200"
                    />
                    <p className="break-all px-3 text-base font-normal text-black">
                      {item.categoryName}
                    </p>
                  </div>

                  {item.categoryName === "Home" ? (
                    <div className="">
                      <p className="max-w-11 flex max-h-7 items-center justify-center rounded-lg bg-[#D9D9D9] px-2 py-[0.15rem] text-[#6D6D6D]">
                        {item.todoList.length}
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => onDeleteClickHandler(item)}
                      className="max-w-11 item-custom flex max-h-7 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9] px-2 py-[0.15rem] text-[#6D6D6D] hover:bg-[#EB4747]"
                    >
                      <p className="new-label">
                        <span>{item.todoList.length}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {/* input */}
          <div className="flex h-16 w-full items-center justify-center gap-8 px-6 py-4">
            <div className="text-xl">+</div>
            <form
              action="#"
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                if (inputRef.current) {
                  onSubmitHandler(event, inputRef.current.value);
                }
              }}
              className="w-full"
            >
              <input
                autoComplete="off"
                placeholder="Create new category..."
                className="line-clamp-3 w-full text-sm outline-0 placeholder:text-sm placeholder:font-normal"
                ref={inputRef}
              />
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
