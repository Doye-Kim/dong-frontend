import {create} from 'zustand';

interface ThemeStatus {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const useThemeStore = create<ThemeStatus>(set => ({
  theme: 'light',
  setTheme: theme => set({theme}),
}));

export default useThemeStore;
