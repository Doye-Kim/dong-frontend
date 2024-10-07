import {create} from 'zustand';

interface GameCreationState {
  startDate: string;
  participantId: number;
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
  setParticipantId: (participantId: number) => void;
  setParticipantIds: (participantIds: number[]) => void;
  setCustomCategoryIds: (customCategoryIds: number[]) => void;
  setAccountNumber: (accountNumber: string) => void;
  resetGame: () => void; // 모든 상태 초기화
}

const useGameCreateStore = create<GameCreationState>(set => ({
  startDate: '',
  endDate: '',
  gameCategoryId: 0,
  participantId: 0,
  participantIds: [],
  fee: 0,
  customCategoryIds: [],
  accountNumber: '',
  setParticipantId: participantId => set({participantId}),
  setStartDate: startDate => set({startDate}),
  setEndDate: endDate => set({endDate}),
  setGameCategoryId: gameCategoryId => set({gameCategoryId}),
  setFee: fee => set({fee: fee}),
  setParticipantIds: participantIds => set({participantIds}),
  setCustomCategoryIds: customCategoryIds => set({customCategoryIds}),
  setAccountNumber: accountNumber => set({accountNumber}),
  resetGame: () =>
    set({
      startDate: '',
      endDate: '',
      gameCategoryId: 0,
      participantIds: [],
      fee: 0,
      customCategoryIds: [],
      accountNumber: '',
      participantId: 0,
    }),
}));

export default useGameCreateStore;
