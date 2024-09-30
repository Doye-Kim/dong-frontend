import { create } from 'zustand';
import axiosInstance from '@/api/axios';
import { getDateWithSeparator } from '@/utils';
import { Payment } from '@/types/domain';

type PaymentListData = Payment[];

interface PaymentStore {
  paymentListData: PaymentListData;
  setPaymentListData: (payments: PaymentListData) => void;
  handleGetPayments: (date: Date) => Promise<void>;
}

const usePaymentDataStore = create<PaymentStore>((set) => ({
  paymentListData: [],
  setPaymentListData: (payments) => set({ paymentListData: payments }),
  handleGetPayments: async (date) => {
    const dateWithSeparator = getDateWithSeparator(date, "-");
    try {
      const paymentsResponse = await axiosInstance.get("/payments", {
        params: {
          date: dateWithSeparator,
        },
      });
      set({ paymentListData: paymentsResponse.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default usePaymentDataStore;
