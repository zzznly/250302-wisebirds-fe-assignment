import { StateCreator } from 'zustand';
import UserService from '@/service/user/UserService';
import { USER_ROLES } from '@/constants';

export interface UserSlice {
  userInfo?: UserInfo;
  userRole: string;
  setUserRole(role: string): void;
  setUserInfo(userInfo: UserSlice['userInfo']): void;
  fetchUserInfo(): Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  userInfo: undefined,
  userRole: USER_ROLES[0].value,
  setUserRole: role => set({ userRole: role }),
  setUserInfo: userInfo => set({ userInfo }),
  fetchUserInfo: async () => {
    try {
      const { data } = await UserService.getUserInfo();
      set({ userInfo: data });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  },
});
