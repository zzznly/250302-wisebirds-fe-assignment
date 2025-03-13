import { StateCreator } from 'zustand';

export interface ErrorSlice {
  globalErrorMessage: string | null;
  setGlobalErrorMessage: (message: string | null) => void;
}

export const createErrorSlice: StateCreator<ErrorSlice> = (set, get) => ({
  globalErrorMessage: null,
  setGlobalErrorMessage: (message: string | null) => set({ globalErrorMessage: message }),
});
