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
  name: "Human",
};

// reducers
// state, redux will pass automatically
// action, the payload
// PayloadAction: this is for typescript

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addName: (state, action: PayloadAction<initialStateType["name"]>) => {
      state.name = action.payload;
      localStorage.setItem("todo-name", JSON.stringify(state.name));
    },
  },
});

// exporting the methods
export const { addName } = reservationsSlice.actions;

export default reservationsSlice.reducer;
