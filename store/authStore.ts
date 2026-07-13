import { create } from 'zustand';

type Role = 'ADMIN' | 'USER';

type AuthUser = {
  id: string;
  username: string;
  role: Role;
};

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
