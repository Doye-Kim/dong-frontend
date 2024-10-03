import axiosInstance from './axios';

export type ResponseGame = {
  gameId: number;
  participantId: number;
  gameCategory: Category;
  gameStatus: 'BEFORE_START' | 'ING' | 'END' | 'CANCEL';
  participantCount: number;
  gameCount: number;
  ownerName: string;
};
const getGames = async (): Promise<ResponseGame[]> => {
  const {data} = await axiosInstance.get('/games');
  return data;
};

const getCategory = async (participantId: number): Promise<Category> => {
  const {data} = await axiosInstance.get(`/games/category/${participantId}`);
  return data;
};
const putCategory = async ({
  participantId,
  customCategoryIds,
}: {
  participantId: number;
  customCategoryIds: number[];
}) => {
  const {data} = await axiosInstance.put('/games/category', {
    participantId,
    customCategoryIds,
  });
  return data;
};

export type RequestGame = {
  participantIds: number[];
  gameCategoryId: number;
  customCategoryIds: number[];
  startDate: string;
  endDate: string;
  fee: number;
  accountNumber: string;
};

const postGame = async ({
  participantIds,
  gameCategoryId,
  customCategoryIds,
  startDate,
  endDate,
  fee,
  accountNumber,
}: RequestGame) => {
  const {data} = await axiosInstance.post('/games', {
    participantIds,
    gameCategoryId,
    customCategoryIds,
    startDate,
    endDate,
    fee,
    accountNumber,
  });
  return data;
};

export type Category = {
  categoryId: number;
  name: string;
  categoryType: 'DEFAULT' | 'CUSTOM';
  imageNumber: number;
};

export type AfterParticipantInfo = {
  userName: string;
  gameCount: number;
};

export type BeforeParticipantInfo = {
  userName: string;
  participantId: number;
  status: 'OWNER' | 'JOINER' | 'DECLINER' | 'WAITING';
};

export type ResponseGameState = {
  gameId: number;
  category: Category;
  status: 'BEFORE_START' | 'ING' | 'END' | 'CANCEL';
  fee: number;
  startDate: string;
  endDate: string;
  ownerName: string;
  afterParticipant: AfterParticipantInfo[];
  beforeParticipant: BeforeParticipantInfo[];
};

const getPrepareGame = async (
  participantId: number,
): Promise<ResponseGameState> => {
  console.log('pppp', participantId);
  const {data} = await axiosInstance.get(`/games/before/${participantId}`);
  return data;
};

const getProgressGame = async (
  participantId: number,
): Promise<ResponseGameState> => {
  const {data} = await axiosInstance.get(`/games/after/${participantId}`);
  return data;
};

const startGame = async ({participantId}: {participantId: number}) => {
  const {data} = await axiosInstance.patch('/games/start', {participantId});
  return data;
};
const leaveGame = async ({participantId}: {participantId: number}) => {
  const {data} = await axiosInstance.patch('/games/leave', {participantId});
  return data;
};
const cancelGame = async ({participantId}: {participantId: number}) => {
  const {data} = await axiosInstance.patch('/games/cancel', {participantId});
  return data;
};

const declineGame = async ({participantId}: {participantId: number}) => {
  const {data} = await axiosInstance.patch('/games/decline', {participantId});
  return data;
};

export type RequestAcceptGame = {
  participantId: number;
  customCategoryIds: number[];
  accountNumber: string;
};
const acceptGame = async ({
  participantId,
  customCategoryIds,
  accountNumber,
}: RequestAcceptGame) => {
  const {data} = await axiosInstance.patch('/games/accept', {
    participantId,
    customCategoryIds,
    accountNumber,
  });
  return data;
};
export {
  getGames,
  getCategory,
  putCategory,
  postGame,
  startGame,
  leaveGame,
  declineGame,
  cancelGame,
  acceptGame,
  getPrepareGame,
  getProgressGame,
};
