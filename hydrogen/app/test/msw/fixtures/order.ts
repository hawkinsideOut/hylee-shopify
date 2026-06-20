import {makeMoney} from './money';
import {makeImage} from './product';

export type MockOrderLineItem = {
  title: string;
  quantity: number;
  discountedTotalPrice: {amount: string; currencyCode: string};
  originalTotalPrice: {amount: string; currencyCode: string};
  variant?: {
    id: string;
    title: string;
    sku: string | null;
    image?: {
      url: string;
      altText: string | null;
      width: number;
      height: number;
    } | null;
    price: {amount: string; currencyCode: string};
    selectedOptions: Array<{name: string; value: string}>;
    product: {handle: string; title: string};
  } | null;
};

export type MockOrder = {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  statusUrl: string;
  currentTotalPrice: {amount: string; currencyCode: string};
  totalPrice: {amount: string; currencyCode: string};
  subtotalPrice?: {amount: string; currencyCode: string} | null;
  totalShippingPrice: {amount: string; currencyCode: string};
  totalTax?: {amount: string; currencyCode: string} | null;
  lineItems: {nodes: MockOrderLineItem[]};
  shippingAddress?: {
    firstName: string | null;
    lastName: string | null;
    address1: string | null;
    city: string | null;
    province: string | null;
    zip: string | null;
    country: string | null;
  } | null;
};

let _orderCounter = 0;

export const makeOrderLineItem = (
  overrides?: Partial<MockOrderLineItem>,
): MockOrderLineItem => ({
  title: 'Test Product',
  quantity: 1,
  discountedTotalPrice: makeMoney(),
  originalTotalPrice: makeMoney(),
  variant: {
    id: 'gid://shopify/ProductVariant/1',
    title: 'Default Title',
    sku: null,
    image: makeImage(),
    price: makeMoney(),
    selectedOptions: [{name: 'Title', value: 'Default Title'}],
    product: {handle: 'test-product', title: 'Test Product'},
  },
  ...overrides,
});

export const makeOrder = (overrides?: Partial<MockOrder>): MockOrder => {
  const n = ++_orderCounter;
  return {
    id: `gid://shopify/Order/${n}`,
    name: `#100${n}`,
    orderNumber: 1000 + n,
    processedAt: '2026-01-01T00:00:00Z',
    fulfillmentStatus: 'FULFILLED',
    financialStatus: 'PAID',
    statusUrl: `https://mock.myshopify.com/orders/token-${n}/authenticate`,
    currentTotalPrice: makeMoney({amount: '59.99'}),
    totalPrice: makeMoney({amount: '59.99'}),
    subtotalPrice: makeMoney({amount: '49.99'}),
    totalShippingPrice: makeMoney({amount: '10.00'}),
    totalTax: makeMoney({amount: '0.00'}),
    lineItems: {nodes: [makeOrderLineItem()]},
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Doe',
      address1: '100 Main St',
      city: 'Austin',
      province: 'Texas',
      zip: '78701',
      country: 'United States',
    },
    ...overrides,
  };
};
