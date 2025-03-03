import { StateCreator } from 'zustand';
import UserService from '@/service/user/UserService';
import { USER_ROLES } from '@/constants';

interface UserInfo {
  email: string;
  name: string;
  company: {
    name: string;
  };
}

export interface UserSlice {
  userInfo?: UserInfo;
  userRole: string;
  setUserRole: (role: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  fetchUserInfo: () => Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  userInfo: undefined,
  userRole: USER_ROLES[0].value,
  setUserRole: (role: string) => set({ userRole: role }),
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  fetchUserInfo: async () => {
    try {
      const response = await UserService.getUserInfo();
      set({ userInfo: response.data });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  },
});
