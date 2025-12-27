import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'manager' | 'viewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: '王大明',
    email: 'admin@nexretail.com',
    role: 'admin',
    avatar: undefined,
  },
  isAuthenticated: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateUserRole: (state, action: PayloadAction<UserRole>) => {
      if (state.currentUser) {
        state.currentUser.role = action.payload;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUserRole, logout } = userSlice.actions;
export default userSlice.reducer;
