import { create } from 'zustand';
import { createUserSlice, UserSlice } from './user';
import { createErrorSlice, ErrorSlice } from './error';

export type AppState = UserSlice & ErrorSlice;

export const useAppStore = create<AppState>()((...args) => ({
  ...createUserSlice(...args),
  ...createErrorSlice(...args),
}));
