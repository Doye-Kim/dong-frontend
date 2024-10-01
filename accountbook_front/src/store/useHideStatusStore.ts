import {create} from 'zustand';

interface HideStatus {
  isHideVisible: boolean;
  toggleIsHideVisible: () => void;
}

const useHideStatusStore = create<HideStatus>(set => ({
  isHideVisible: false,
  toggleIsHideVisible: () =>
    set(state => ({isHideVisible: !state.isHideVisible})),
}));

export default useHideStatusStore;
