import { createSlice } from "@reduxjs/toolkit";
let savedLang = "english"; // Default value in case local storage doesn't have a value
try {
  const storedLang = window.localStorage.getItem("lang");
  if (storedLang) {
    savedLang = JSON.parse(storedLang);
  }
} catch (error) {
  console.log(error);
}
const initialState = { lang: "english", langUser: savedLang, method: null };

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setLang: (state, { payload }) => {
      state.lang = payload;
    },
    setLangUser: (state, { payload }) => {
      state.langUser = payload;
    },
    setMethod: (state, { payload }) => {
      state.method = payload;
    },
  },
});

export const { setLang, setMethod, setLangUser } = optionsSlice.actions;
export default optionsSlice.reducer;
