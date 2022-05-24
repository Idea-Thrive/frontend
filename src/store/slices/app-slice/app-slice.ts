import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type App = {
  role: string | null;
};

const initialState: App = {
  role: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateUserRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
  },
});

export const { updateUserRole } = appSlice.actions;

export default appSlice.reducer;
