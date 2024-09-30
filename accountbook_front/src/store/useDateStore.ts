import { create } from 'zustand';

interface MonthYear {
  date: Date;
  setDate: (newDate: Date) => void;
  updateMonth: (increment: number) => void;
}

const useDateStore = create<MonthYear>((set) => ({
  date: new Date(), // 초기값을 현재 날짜로 설정
  setDate: (newDate: Date) => {
    set({ date: newDate });
  },
  updateMonth: (increment: number) => {
    set((state) => {
      const newDate = new Date(state.date);
      newDate.setMonth(newDate.getMonth() + increment);
      return { date: newDate };
    });
  },
}));

export default useDateStore;
