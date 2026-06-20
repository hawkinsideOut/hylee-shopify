import {storefrontHandlers} from './storefront';
import {customerAccountHandlers} from './customer-account';
import {adminHandlers} from './admin';
import {searchaniseHandlers} from './searchanise';

export const handlers = [
  ...storefrontHandlers,
  ...customerAccountHandlers,
  ...adminHandlers,
  ...searchaniseHandlers,
];
