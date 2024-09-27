import axiosInstance from './axios';

export type hideState = 'HIDE_ALL' | 'HIDE_ASSET' | 'HIDE_LIST' | 'NONE';

export type RegisterAsset = {
  cards: RegisterCardInfo[];
  accounts: RegisterAccountInfo[];
};

export type RegisterCardInfo = {
  cardNo: string;
  cvc: string;
  cardIssuerCode: string;
  cardIssuerName: string;
  cardName: string;
  state: hideState;
};

export type RegisterAccountInfo = {
  bankCode: string;
  bankName: string;
  userName: string;
  accountNo: string;
  accountName: string;
  accountTypeCode: string;
  accountCreatedDate: string;
  accountExpiryDate: string;
  lastTransactionDate: string;
  dailyTransferLimit: number;
  oneTimeTransferLimit: number;
  accountBalance: number;
  currency: string;
  state: hideState;
};

const getRegisterAssets = async (): Promise<RegisterAsset> => {
  const {data} = await axiosInstance.get('/assets/ssafy');
  return data;
};

const postRegisterAssets = async ({
  cards,
  accounts,
}: RegisterAsset): Promise<string> => {
  const {data} = await axiosInstance.post('/assets', {
    cards,
    accounts,
  });
  return data;
};

export type Asset = {
  accountList: AccountInfo[];
  cardList: CardInfo[];
};

export type AccountInfo = {
  id: number;
  nickname: string;
  name: string;
  accountNumber: string;
  bank: string;
  hideState: hideState;
  depositState: string;
};
export type CardInfo = {
  id: number;
  nickname: string;
  name: string;
  cardNumber: string;
  cvc: string;
  issuer: string;
  hideState: hideState;
  depositState: string;
};

const getAssets = async (): Promise<Asset> => {
  const {data} = await axiosInstance.get('/assets');
  return data;
};

const patchCardState = async ({
  cardId,
  hideState,
}: {
  cardId: number;
  hideState: string;
}): Promise<void> => {
  const {data} = await axiosInstance.patch(
    `/assets/cards/${cardId}/state`,
    null,
    {
      params: {hideState: hideState},
    },
  );
  return data;
};

const patchCardNickname = async ({
  cardId,
  nickname,
}: {
  cardId: number;
  nickname: string;
}): Promise<void> => {
  const {data} = await axiosInstance.patch(
    `/assets/cards/${cardId}/state`,
    null,
    {
      params: {nickname: nickname},
    },
  );
  return data;
};

const patchAccountState = async ({
  accountId,
  hideState,
}: {
  accountId: number;
  hideState: string;
}): Promise<void> => {
  const {data} = await axiosInstance.patch(
    `/assets/cards/${accountId}/state`,
    null,
    {
      params: {hideState: hideState},
    },
  );
  return data;
};

const patchAccountNickname = async ({
  accountId,
  nickname,
}: {
  accountId: number;
  nickname: string;
}): Promise<void> => {
  const {data} = await axiosInstance.patch(
    `/assets/cards/${accountId}/state`,
    null,
    {
      params: {hideState: nickname},
    },
  );
  return data;
};

export {
  getRegisterAssets,
  postRegisterAssets,
  getAssets,
  patchCardState,
  patchCardNickname,
  patchAccountState,
  patchAccountNickname,
};
