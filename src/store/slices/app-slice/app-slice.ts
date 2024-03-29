import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Idea } from 'types/types';

type User = {
  company_id: string | null;
  email: string | null;
  first_name: string | null;
  gender: string | null;
  last_name: string | null;
  password: string | null;
  personnel_id: string | null;
  phone_number: string | null;
  photo_url: string | null;
  role: string | null;
  id: string | null;
};

type Global = {
  isMenuOpen: boolean;
  globalLoading: boolean;
};

type App = {
  user: User;
  ideas: Array<Idea>;
  filteredIdeas: Array<Idea>;
  global: Global;
};

const initialState: App = {
  user: {
    company_id: null,
    email: null,
    first_name: null,
    gender: null,
    last_name: null,
    password: null,
    personnel_id: null,
    phone_number: null,
    photo_url: null,
    role: null,
    id: null,
  },
  ideas: [],
  filteredIdeas: [],
  global: { isMenuOpen: false, globalLoading: false },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    updateIdeas(state, action: PayloadAction<Array<Idea>>) {
      state.ideas = action.payload;
    },
    updateFilteredIdeas(state, action: PayloadAction<Array<Idea>>) {
      state.filteredIdeas = action.payload;
    },

    toggleMenu(state) {
      state.global.isMenuOpen = !state.global.isMenuOpen;
    },

    toggleGlobalLoading(state) {
      state.global.globalLoading = !state.global.globalLoading;
    },
  },
});

export const {
  updateUser,
  updateIdeas,
  updateFilteredIdeas,
  toggleMenu,
  toggleGlobalLoading,
} = appSlice.actions;

export default appSlice.reducer;
