import axiosInstance from './axios';

export type ResponseSettlementPayment = {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  paymentName: string;
  categoryName: string;
  imageNumber: number;
};

export type ResponseSettlementsUser = {
  userId: number;
  userName: string;
  cost: number;
  transferState: 'FINISH' | 'YET';
};

export type ResponseSettlements = {
  settlementId: number;
  settlementState: 'FINISH' | 'YET';
  settlementDate: string;
  representativeMerchandise: string;
  settlementPaymentCnt: number;
  settlementPaymentList: ResponseSettlementPayment[];
  settlementUserCnt: number;
  settlementUserList: ResponseSettlementsUser[];
};
const getSettlements = async (date: string): Promise<ResponseSettlements> => {
  const {data} = await axiosInstance.get(`/settlements?date=${date}`);
  return data;
};

export type RequestSettlementUser = {
  userId: number;
  amount: number;
};
export type RequestSettlementPayment = {
  paymentId: 0;
  settlementUserList: RequestSettlementUser[];
};
export type RequestSettlement = {
  accountId: 0;
  settlementPaymentList: RequestSettlementPayment[];
};

const postSettlement = async ({
  accountId,
  settlementPaymentList,
}: RequestSettlement) => {
  const {data} = await axiosInstance.post('/settlements', {
    accountId,
    settlementPaymentList,
  });
  return data;
};

const postTransferSettlement = async ({
  settlementId,
  accountId,
  accountNumber,
}: {
  settlementId: number;
  accountNumber: string;
  accountId: number;
}) => {
  const {data} = await axiosInstance.post('/settlements/transfer', {
    settlementId,
    accountNumber,
    accountId,
  });
  return data;
};

const postFinishSettlement = async (settlementId: number) => {
  const {data} = await axiosInstance.post(
    `/settlements/finish/${settlementId}`,
  );
  return data;
};
export type ResponseSettlementUser = {
  userId: number;
  userName: string;
  amount: number;
  transferState: 'FINISH' | 'YET';
};
export type ResponseSettlement = {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  settlementUserList: ResponseSettlementUser[];
};

const getSettlement = async (
  settlementId: number,
): Promise<ResponseSettlement[]> => {
  const {data} = await axiosInstance.get(`/settlements/${settlementId}`);
  return data;
};

export type ResponseRequestSettlement = {
  settlementId: number;
  accountId: number;
  userName: string;
  settlementPaymentList: ResponseRequestSettlementPayment[];
  cost: number;
};

export type ResponseRequestSettlementPayment = {
  settlementPaymentId: number;
  paymentId: number;
  balance: number;
  merchantName: string;
  categoryId: number;
  categoryName: string;
  amount: number;
};

const getRequestSettlement = async (
  settlementId: number,
): Promise<ResponseRequestSettlement> => {
  const {data} = await axiosInstance.get(
    `/settlements/requests/${settlementId}`,
  );
  return data;
};
export {
  getSettlements,
  postSettlement,
  postTransferSettlement,
  postFinishSettlement,
  getSettlement,
  getRequestSettlement,
};
