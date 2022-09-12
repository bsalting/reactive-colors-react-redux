import { startTransition } from "react";
import { createStore } from "redux";

const initialState = {
  colors: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_COLORS") {
    state = { ...state, colors: action.colors };
  } else if (action.type === "NEW_COLOR") {
    state = { ...state, colors: [...state.colors, action.color] };
  } else if (action.type === "DELETE_COLOR") {
    state = {
      ...state,
      colors: state.colors.filter((color) => color.id !== action.color.id),
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
