import {create} from 'zustand';

interface UserState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  reset: () => void;
}
const useUserStore = create<UserState>(set => ({
  isLogin: false,
  setIsLogin: (isLogin: boolean) => {
    set({isLogin});
  },
  reset: () => set({isLogin: false}),
}));

export default useUserStore;
