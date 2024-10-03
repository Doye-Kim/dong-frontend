import {create} from 'zustand';

interface GameCreationState {
  startDate: string;
  endDate: string;
  gameCategoryId: number;
  fee: number;
  participantIds: number[];
  customCategoryIds: number[];
  accountNumber: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setGameCategoryId: (gameCategoryId: number) => void;
  setFee: (fee: number) => void;
  setParticipantIds: (participantIds: number[]) => void;
  setCustomCategoryIds: (customCategoryIds: number[]) => void;
  setAccountNumber: (accountNumber: string) => void;
  reset: () => void; // 모든 상태 초기화
}

const useGameCreateStore = create<GameCreationState>(set => ({
  startDate: '',
  endDate: '',
  gameCategoryId: 0,
  participantIds: [],
  fee: 0,
  customCategoryIds: [],
  accountNumber: '',
  setStartDate: startDate => set({startDate}),
  setEndDate: endDate => set({endDate}),
  setGameCategoryId: gameCategoryId => set({gameCategoryId}),
  setFee: fee => set({fee: fee}),
  setParticipantIds: participantIds => set({participantIds}),
  setCustomCategoryIds: customCategoryIds => set({customCategoryIds}),
  setAccountNumber: accountNumber => set({accountNumber}),
  reset: () =>
    set({
      startDate: '',
      endDate: '',
      gameCategoryId: 0,
      participantIds: [],
      fee: 0,
      customCategoryIds: [],
      accountNumber: '',
    }),
}));

export default useGameCreateStore;
