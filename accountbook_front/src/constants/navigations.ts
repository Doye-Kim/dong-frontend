const authNavigations = {
  AUTH_HOME: 'AuthHome',
  JOIN: 'Join',
  PIN: 'PinCode',
  SELECT_ASSETS: 'SelectAssets',
} as const;

const mainNavigations = {
  ACCOUNTBOOK: 'AccountBook',
  ASSET: 'Asset',
  EXTRA: 'Extra',
} as const;

const accountBookNavigations = {
  TABBAR: 'AccountBookTabbar',
  HEADER: 'AccountBookHeader',
  PAYMENTDETAIL : 'PaymentDetail',
  PAYMENTADD: 'PaymentAdd',
  BUDGETCREATE: 'BudgetCreate',
  BUDGET: 'Budget',
} as const;

const accountBookTabNavigations = {
  CALENDAR: 'Calendar',
  PAYMENT: 'Payment',
  SETTLEMENT: 'Settlement',
  BUDGET: 'Budget',
} as const;

const accountBookHeaderNavigations = {
  FILTER: 'CategoryFilter',
  REPORT: 'Report',
} as const;

export {authNavigations, mainNavigations, accountBookNavigations, accountBookTabNavigations, accountBookHeaderNavigations};