import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
type initialStateType = {
  categoryList: categoryType[];
  name: string;
};

// state
const initialState = <initialStateType>{
  categoryList: [
    {
      id: 1,
      categoryName: "Home",
      isUsed: true,
      todoList: [],
    },
  ],
  name: "",
};

// reducers
// state, redux will pass automatically
// action, the payload
// PayloadAction: this is for typescript

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      localStorage.setItem("todo-name", JSON.stringify(state.name));
    },
    allCategory: (state, action: PayloadAction<[]>) => {
      state.categoryList = action.payload;
    },
    addCategory: (state, action: PayloadAction<categoryType>) => {
      state.categoryList = [...state.categoryList, action.payload];
      localStorage.setItem("todo-data", JSON.stringify(state.categoryList));
    },
    changeIsUsed: (state, action: PayloadAction<categoryType>) => {
      state.categoryList = state.categoryList.map((item: categoryType) => {
        if (action.payload.categoryName === item.categoryName) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: true,
            todoList: item.todoList,
          };
        }
        return {
          id: item.id,
          categoryName: item.categoryName,
          isUsed: false,
          todoList: item.todoList,
        };
      });
      localStorage.setItem("todo-data", JSON.stringify(state.categoryList));
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categoryList = state.categoryList.filter((item) => {
        return action.payload !== item.id;
      });
      localStorage.setItem("todo-data", JSON.stringify(state.categoryList));
    },
  },
});

// exporting the methods
export const {
  addName,
  allCategory,
  addCategory,
  changeIsUsed,
  removeCategory,
} = reservationsSlice.actions;

export default reservationsSlice.reducer;
