type Payment = {
  paymentsId: number;
  merchantName: string;
  categoryId: number;
  categoryName: string;
  categoryImageNumber: number;
  balance: number;
  paymentName: string;
  memo: string;
  paymentTime: string;
  paymentState: string;
  paymentType: string;
  cardIssuerName?: string;
  asset?: string;
  assetId?: number;
};

type Account = {
  accountId: number;
  nickname: string;
  name: string;
  accountNumber: string;
  bank: string;
  hideStatus: string;
  depositStatus: string;
  accountBalance: string;
}

type Card = {
  id: number;
  cardNo: string;
  cardIssuerName: string;
  cardName: string;
  hideStatus: string;
  nickname: string;
}

type Game = {
  gameId: string;
  categoryId: string;
  status: string;
  gameCount: string;
  participants: string[];
  rank: string;
}

type Seed = {
  id: string;
  title: string;
  entireRound: string;
  endDate: string;
  status: string;
  passedRound: string;
}

type Gift = {
  id: number,
  name: string;
  price: number;
  stock: number;
}

export type {Payment, Account, Card, Game, Seed, Gift};