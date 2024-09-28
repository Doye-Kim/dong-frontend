import axiosInstance from './axios';

const getSeeds = async () => {
  const {data} = await axiosInstance.get('/seeds');
  return data;
};

export type PeriodOptions = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export type RequestSeed = {
  depositAccountId: number;
  withdrawalAccountId: number;
  title: string;
  periodStatus: PeriodOptions;
  targetAmount: number;
  startDate: string;
  endDate: string;
};

const postSeed = async ({
  depositAccountId,
  withdrawalAccountId,
  title,
  periodStatus,
  targetAmount,
  startDate,
  endDate,
}: RequestSeed) => {
  const {data} = await axiosInstance.post('/seeds', {
    depositAccountId,
    withdrawalAccountId,
    title,
    periodStatus,
    targetAmount,
    startDate,
    endDate,
  });
  return data;
};
export type SeedStatusOptions = 'COMPLETED' | 'CANCEL' | 'PROCEEDING';
export type RoundStatusOptions = 'SUCCESS' | 'FAIL' | 'NONE';

export type RoundInfo = {
  id: number;
  status: RoundStatusOptions;
  transferDate: string;
};

export type ResponseSeed = {
  id: number;
  depositAccount: string;
  withdrawalAccount: string;
  title: string;
  period: PeriodOptions;
  targetAmount: number;
  entireRound: number;
  endDate: string;
  status: SeedStatusOptions;
  passedRound: number;
  dueDate: string;
  totalTransferredAmount: number;
  rounds: RoundInfo[];
};
const getSeed = async (id: number): Promise<ResponseSeed> => {
  const {data} = await axiosInstance.get(`/seeds/${id}`);
  return data;
};

const deleteSeed = async (id: number) => {
  const {data} = await axiosInstance.delete(`/seeds/${id}`);
  return data;
};

export {getSeed, getSeeds, postSeed, deleteSeed};
