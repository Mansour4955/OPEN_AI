import { configureStore } from "@reduxjs/toolkit";

import optionsReducer from "./optionsSlice";
import modeReducer from "./modeSlice";

export const store = configureStore({
  reducer: { options: optionsReducer, themode: modeReducer },
});
