import {create} from 'zustand';
import axiosInstance from '@/api/axios';
import {Payment} from '@/types/domain';

type PaymentData = Record<string, Payment[]>;

interface PaymentStore {
  paymentData: PaymentData;
  setPaymentData: (yearMonth: string, payments: Payment[]) => void;
  fetchPaymentData: (date: string) => Promise<void>;
}

const usePaymentDataStore = create<PaymentStore>(set => ({
  paymentData: {},
  setPaymentData: (yearMonth, payments) => {
    set(state => ({
      paymentData: {
        ...state.paymentData,
        [yearMonth]: payments,
      },
    }));
  },
  fetchPaymentData: async date => {
    const yearMonth = date.slice(0, 7);
    // console.log(yearMonth)
    try {
      const paymentsResponse = await axiosInstance.get('/payments', {
        params: {
          date,
        },
      });
      set(state => ({
        paymentData: {
          ...state.paymentData,
          [yearMonth]: paymentsResponse.data,
        },
      }));
    } catch (error) {
      console.error('Failed to fetch payment data:', error);
    }
  },
}));

export default usePaymentDataStore;
