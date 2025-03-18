import { StateCreator } from 'zustand';
import { USER_ROLES } from '@/constants';

export interface UserSlice {
  userInfo?: UserInfo;
  userRole: string;
  setUserRole(role: string): void;
  setUserInfo(userInfo: UserSlice['userInfo']): void;
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  userInfo: undefined,
  userRole: USER_ROLES[0].value,
  setUserRole: role => set({ userRole: role }),
  setUserInfo: userInfo => set({ userInfo }),
});
