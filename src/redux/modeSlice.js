import { createSlice } from "@reduxjs/toolkit";

let savedMode = "light"; // Default value in case local storage doesn't have a value
try {
  const storedMode = window.localStorage.getItem("theme");
  if (storedMode) {
    savedMode = JSON.parse(storedMode);
  }
} catch (error) {
  console.log(error);
}
const initialState = { mode: savedMode };

const modeSlice = createSlice({
  name: "themode",
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
