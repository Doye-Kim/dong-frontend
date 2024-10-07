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
  id: number;
  nickname: string;
  name: string;
  accountNumber: string;
  balance: number;
  bank: string;
  hideStatus: string;
  depositState: string;
}

type Card = {
  id: number;
  nickname: string;
  name: string;
  cardNumber: string;
  cvc: string;
  issuer: string;
  hideStatus: string;
  depositState: string;
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

type Category = {
  categoryId: number;
  categoryName: string;
  categoryImageNumber: number;
  budget: number;
  use: number;
}

export type {Payment, Account, Card, Game, Seed, Gift, Category};