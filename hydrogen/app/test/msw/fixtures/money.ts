type Money = {amount: string; currencyCode: string};

export const makeMoney = (overrides?: Partial<Money>): Money => ({
  amount: '29.99',
  currencyCode: 'USD',
  ...overrides,
});
