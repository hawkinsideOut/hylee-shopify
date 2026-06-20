import {makeProduct, makeImage, type MockProduct} from './product';
import {makeMoney} from './money';

export type MockCollectionProduct = Omit<
  MockProduct,
  | 'descriptionHtml'
  | 'description'
  | 'options'
  | 'selectedVariant'
  | 'media'
  | 'collections'
>;

export type MockCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  seo: {title: string; description: string};
  childCollections?: {
    references?: {
      nodes: Array<{
        handle: string;
        title: string;
        image?: {
          url: string;
          altText: string | null;
          width: number;
          height: number;
        } | null;
      }>;
    } | null;
  } | null;
  products: {
    nodes: MockCollectionProduct[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    filters: Array<{
      id: string;
      label: string;
      type: string;
      presentation: string;
      values: Array<{id: string; label: string; count: number; input: string}>;
    }>;
  };
};

export type MockStubCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  priceRange: {minVariantPrice: {amount: string; currencyCode: string}};
};

let _collectionCounter = 0;

export const makeCollectionProduct = (
  overrides?: Partial<MockCollectionProduct>,
): MockCollectionProduct => {
  const base = makeProduct();
  const {
    descriptionHtml,
    description,
    options,
    selectedVariant,
    media,
    collections,
    ...rest
  } = base;
  return {...rest, ...overrides};
};

export const makeCollection = (
  overrides?: Partial<MockCollection>,
  productCount = 12,
): MockCollection => {
  const n = ++_collectionCounter;
  return {
    id: `gid://shopify/Collection/${n}`,
    title: `Test Collection ${n}`,
    handle: `test-collection-${n}`,
    description: 'A test collection.',
    descriptionHtml: '<p>A test collection.</p>',
    image: makeImage(),
    seo: {title: `Test Collection ${n}`, description: 'A test collection.'},
    childCollections: null,
    products: {
      nodes: Array.from({length: productCount}, () => makeCollectionProduct()),
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: false,
        startCursor: 'cursor-start',
        endCursor: 'cursor-end',
      },
      filters: [
        {
          id: 'filter.p.vendor',
          label: 'Brand',
          type: 'LIST',
          presentation: 'LIST',
          values: [
            {
              id: 'filter.p.vendor:Hy-lee',
              label: 'Hy-lee',
              count: productCount,
              input: '{"productVendor":"Hy-lee"}',
            },
          ],
        },
        {
          id: 'filter.v.price',
          label: 'Price',
          type: 'PRICE_RANGE',
          presentation: 'SLIDER',
          values: [
            {
              id: 'filter.v.price:0:200',
              label: '$0 - $200',
              count: productCount,
              input: '{"price":{"min":0,"max":200}}',
            },
          ],
        },
      ],
    },
    ...overrides,
  };
};

export const makeStubCollection = (
  overrides?: Partial<MockStubCollection>,
): MockStubCollection => {
  const n = ++_collectionCounter;
  return {
    id: `gid://shopify/Collection/${n}`,
    handle: `collection-${n}`,
    title: `Collection ${n}`,
    description: '',
    image: null,
    priceRange: {minVariantPrice: makeMoney()},
    ...overrides,
  };
};
