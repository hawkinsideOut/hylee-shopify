import {makeOrder, type MockOrder} from './order';
import {makeMailingAddress, type MockMailingAddress} from './address';

export type MockCustomer = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  phone: string | null;
  createdAt: string;
  acceptsMarketing: boolean;
  defaultAddress?: MockMailingAddress | null;
  addresses: {nodes: MockMailingAddress[]};
  orders: {
    nodes: MockOrder[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string | null;
    };
  };
};

export const makeCustomer = (
  overrides?: Partial<MockCustomer>,
): MockCustomer => ({
  id: 'gid://shopify/Customer/1',
  email: 'test@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  displayName: 'Jane Doe',
  phone: null,
  createdAt: '2026-01-01T00:00:00Z',
  acceptsMarketing: false,
  defaultAddress: makeMailingAddress(),
  addresses: {nodes: [makeMailingAddress(), makeMailingAddress()]},
  orders: {
    nodes: [makeOrder(), makeOrder(), makeOrder()],
    pageInfo: {hasNextPage: false, hasPreviousPage: false, endCursor: null},
  },
  ...overrides,
});
