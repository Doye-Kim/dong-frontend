import {ResponsePayment} from '@/screen/accountBook/settlement/SettlementPaymentsScreen';
import {create} from 'zustand';

export type SettlementUser = {
  userId: number;
  amount: number;
  nickname: string;
};
export type SettlementPayment = {
  paymentId: number;
  settlementUserList: SettlementUser[];
};
interface SettlementCreationState {
  accountId: number;
  settlementPaymentList: SettlementPayment[];
  paymentList: ResponsePayment[];
  setAccountId: (id: number) => void; // accountId 설정
  setPaymentList: (payment: ResponsePayment[]) => void;
  setSettlementPayment: (payment: SettlementPayment[]) => void; // 결제 정보 추가
  setSettlementUser: (paymentId: number, user: SettlementUser[]) => void; // 특정 결제의 유저 정보 업데이트
  reset: () => void; // 모든 상태 초기화
}

const useSettlementCreateStore = create<SettlementCreationState>(set => ({
  accountId: 0,
  settlementPaymentList: [],
  paymentList: [],
  userList: [],
  setAccountId: (id: number) => set({accountId: id}),
  setPaymentList: (payments: ResponsePayment[]) =>
    set({
      paymentList: payments,
    }),
  setSettlementPayment: (payment: SettlementPayment[]) =>
    set({
      settlementPaymentList: payment,
    }),

  setSettlementUser: (paymentId: number, updatedUsers: SettlementUser[]) =>
    set(state => ({
      settlementPaymentList: state.settlementPaymentList.map(payment =>
        payment.paymentId === paymentId
          ? {
              ...payment,
              settlementUserList: updatedUsers,
            }
          : payment,
      ),
    })),

  // 상태 초기화 함수
  reset: () =>
    set({
      accountId: 0,
      settlementPaymentList: [],
      paymentList: [],
    }),
}));

export default useSettlementCreateStore;
