const authNavigations = {
  AUTH_HOME: 'AuthHome',
  JOIN: 'Join',
  PIN: 'PinCode',
  SELECT_ASSETS: 'SelectAssets',
} as const;

const mainNavigations = {
  ACCOUNTBOOK: 'AccountBook',
  ASSET: 'Asset',
  GAME: 'Game',
  EXTRA: 'Extra',
} as const;

const accountBookNavigations = {
  TABBAR: 'AccountBookTabbar',
  HEADER: 'AccountBookHeader',
  PAYMENTDETAIL: 'PaymentDetail',
  PAYMENTADD: 'PaymentAdd',
  BUDGETCREATE: 'BudgetCreate',
  BUDGET: 'Budget',
  PAYMENTDIVIDE: 'PaymentDivide',
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

const gameNavigations = {
  MAIN: 'GameMain',
  CREATE: 'GameCreate',
  DETAIL: 'GameDetail',
  FRIENDS: 'GameFriends',
  PREPARE: 'GamePrepare',
  ACCOUNT: 'SelectAccount',
  CATEGORY: 'SelectCategory',
  RESULT: 'GameResult',
} as const;

const extraNavigations = {
  MAIN: 'ExtraMain',
  MARKET: 'PointMarket',
  CATEGORY: 'CategoryEdit',
  BUDGET: 'Budget',
  REPORT: 'Report',
} as const;

const assetNavigations = {
  MAIN: 'AssetMain',
  DETAIL: 'AssetDetailNavigator',
  GAME: 'GameNavigator',
  SEED: 'SeedNavigator',
} as const;

const assetDetailNavigations = {
  ACCOUNTDETAIL: 'AccountDetail',
  ACCOUNTMANAGE: 'AccountManage',
  CARDDETAIL: 'CardDetail',
  CARDMANAGE: 'CardManage',
  PAYMENTDETAIL: 'PaymentDetail',
} as const;

const seedNavigations = {
  CREATE: 'SeedCreate',
  DETAIL: 'SeedDetail',
} as const;

export {
  authNavigations,
  mainNavigations,
  accountBookNavigations,
  accountBookTabNavigations,
  accountBookHeaderNavigations,
  extraNavigations,
  assetNavigations,
  assetDetailNavigations,
  gameNavigations,
  seedNavigations,
};
