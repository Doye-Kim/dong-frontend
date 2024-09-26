type Payment = {
  payments_id: string;
  merchantName: string;
  categoryName: string;
  categoryNumber: string;
  balance: number;
  cardName: string;
  memo: string;
  createdDate: string;
};

type Account = {
  accountId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountNickname: string;
  hideStatus: string;
  depositStatus: string;
  accountBalance: string;
}

type Card = {
  cardNo: string;
  cardIssuerName: string;
  cardName: string;
  hideStatus: string;
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