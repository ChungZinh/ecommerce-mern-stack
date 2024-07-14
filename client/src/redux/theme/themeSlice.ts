import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  value: 'light' | 'dark';
}

const initialState: ThemeState = {
  value: 'light',
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
export type { ThemeState };
