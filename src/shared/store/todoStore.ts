import { configureStore } from "@reduxjs/toolkit";
// i assume that we can change the name of the default exported Fn
import reservationReducer from "./feutures/reservationSlice";

export const todoStore = configureStore({
  reducer: {
    reservations: reservationReducer,
  },
});

// for typescript
export type RootState = ReturnType<typeof todoStore.getState>;
export type todoDispatch = typeof todoStore.dispatch;
