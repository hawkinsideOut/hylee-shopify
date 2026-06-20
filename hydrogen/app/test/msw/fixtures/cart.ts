import {makeMoney} from './money';
import {makeVariant, makeImage} from './product';

export type MockCartLine = {
  id: string;
  quantity: number;
  attributes: Array<{key: string; value: string}>;
  cost: {
    totalAmount: {amount: string; currencyCode: string};
    amountPerQuantity: {amount: string; currencyCode: string};
    compareAtAmountPerQuantity?: {amount: string; currencyCode: string} | null;
  };
  merchandise: {
    id: string;
    availableForSale: boolean;
    requiresShipping: boolean;
    title: string;
    sku: string | null;
    price: {amount: string; currencyCode: string};
    compareAtPrice?: {amount: string; currencyCode: string} | null;
    image?: {
      id: string;
      url: string;
      altText: string | null;
      width: number;
      height: number;
    } | null;
    product: {
      handle: string;
      title: string;
      id: string;
      vendor: string;
      productType: string;
    };
    selectedOptions: Array<{name: string; value: string}>;
  };
};

export type MockCart = {
  updatedAt: string;
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  note: string | null;
  appliedGiftCards: Array<{
    id: string;
    lastCharacters: string;
    amountUsed: {amount: string; currencyCode: string};
  }>;
  buyerIdentity: {
    countryCode: string | null;
    email: string | null;
    phone: string | null;
    customer?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      displayName: string;
    } | null;
  };
  lines: {nodes: MockCartLine[]};
  cost: {
    subtotalAmount: {amount: string; currencyCode: string};
    totalAmount: {amount: string; currencyCode: string};
    totalDutyAmount?: {amount: string; currencyCode: string} | null;
    totalTaxAmount?: {amount: string; currencyCode: string} | null;
  };
  attributes: Array<{key: string; value: string}>;
  discountCodes: Array<{code: string; applicable: boolean}>;
};

let _lineCounter = 0;

export const makeCartLine = (
  overrides?: Partial<MockCartLine>,
): MockCartLine => {
  const n = ++_lineCounter;
  const price = makeMoney();
  return {
    id: `gid://shopify/CartLine/${n}`,
    quantity: 1,
    attributes: [],
    cost: {
      totalAmount: makeMoney(),
      amountPerQuantity: price,
      compareAtAmountPerQuantity: null,
    },
    merchandise: {
      id: `gid://shopify/ProductVariant/${n}`,
      availableForSale: true,
      requiresShipping: true,
      title: 'Default Title',
      sku: null,
      price,
      compareAtPrice: null,
      image: makeImage(),
      product: {
        handle: `test-product-${n}`,
        title: `Test Product ${n}`,
        id: `gid://shopify/Product/${n}`,
        vendor: 'Hy-lee',
        productType: 'Furniture',
      },
      selectedOptions: [{name: 'Title', value: 'Default Title'}],
    },
    ...overrides,
  };
};

export const makeCart = (overrides?: Partial<MockCart>): MockCart => ({
  updatedAt: '2026-01-01T00:00:00Z',
  id: 'gid://shopify/Cart/test-cart-id',
  checkoutUrl: 'https://mock.myshopify.com/checkouts/test',
  totalQuantity: 1,
  note: null,
  appliedGiftCards: [],
  buyerIdentity: {countryCode: 'US', email: null, phone: null, customer: null},
  lines: {nodes: [makeCartLine()]},
  cost: {
    subtotalAmount: makeMoney(),
    totalAmount: makeMoney(),
    totalDutyAmount: null,
    totalTaxAmount: null,
  },
  attributes: [],
  discountCodes: [],
  ...overrides,
});

export const makeEmptyCart = (overrides?: Partial<MockCart>): MockCart =>
  makeCart({
    totalQuantity: 0,
    lines: {nodes: []},
    cost: {
      subtotalAmount: makeMoney({amount: '0.00'}),
      totalAmount: makeMoney({amount: '0.00'}),
      totalDutyAmount: null,
      totalTaxAmount: null,
    },
    ...overrides,
  });
