type Payment = {
  payments_id: string;
  merchantName: string;
  categoryName: string;
  type: 'expense' | 'income';
  balance: number;
  cardName: string;
  memo: string;
  status: string;
  createdDate: string;
};

export type {Payment};