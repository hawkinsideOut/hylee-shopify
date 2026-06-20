import {makeMoney} from './money';

export type MockImage = {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type MockVariant = {
  id: string;
  availableForSale: boolean;
  sku: string;
  title: string;
  selectedOptions: Array<{name: string; value: string}>;
  image?: MockImage | null;
  price: {amount: string; currencyCode: string};
  compareAtPrice?: {amount: string; currencyCode: string} | null;
  unitPrice?: {amount: string; currencyCode: string} | null;
};

export type MockProduct = {
  id: string;
  title: string;
  vendor: string;
  handle: string;
  descriptionHtml: string;
  description: string;
  productType: string;
  tags: string[];
  publishedAt: string;
  options: Array<{name: string; values: string[]}>;
  selectedVariant: MockVariant | null;
  variants: {nodes: MockVariant[]};
  media: {nodes: Array<{id: string; image?: MockImage | null}>};
  images: {nodes: MockImage[]};
  priceRange: {minVariantPrice: {amount: string; currencyCode: string}};
  compareAtPriceRange: {
    minVariantPrice: {amount: string; currencyCode: string};
  };
  metafields: Array<{key: string; value: string} | null>;
  availableForSale: boolean;
  collections?: {nodes: Array<{id: string; handle: string; title: string}>};
};

export type MockSearchaniseProduct = {
  product_id: string;
  title: string;
  handle: string;
  link: string;
  image_link: string;
  price: string;
  compare_at_price: string;
  vendor: string;
  product_type: string;
  tags: string;
  available: boolean;
  add_to_cart_id: string;
};

let _productCounter = 0;

export const makeImage = (overrides?: Partial<MockImage>): MockImage => ({
  id: 'gid://shopify/MediaImage/1',
  url: 'https://cdn.shopify.com/s/files/1/test-product.jpg',
  altText: 'Test product image',
  width: 800,
  height: 800,
  ...overrides,
});

export const makeVariant = (overrides?: Partial<MockVariant>): MockVariant => ({
  id: 'gid://shopify/ProductVariant/1',
  availableForSale: true,
  sku: 'TEST-SKU-001',
  title: 'Default Title',
  selectedOptions: [{name: 'Title', value: 'Default Title'}],
  image: makeImage(),
  price: makeMoney(),
  compareAtPrice: null,
  unitPrice: null,
  ...overrides,
});

export const makeProduct = (overrides?: Partial<MockProduct>): MockProduct => {
  const n = ++_productCounter;
  const handle = `test-product-${n}`;
  const variant = makeVariant({id: `gid://shopify/ProductVariant/${n}`});
  return {
    id: `gid://shopify/Product/${n}`,
    title: `Test Product ${n}`,
    vendor: 'Hy-lee',
    handle,
    descriptionHtml: '<p>A test product description.</p>',
    description: 'A test product description.',
    productType: 'Furniture',
    tags: ['test'],
    publishedAt: '2026-01-01T00:00:00Z',
    options: [{name: 'Title', values: ['Default Title']}],
    selectedVariant: variant,
    variants: {nodes: [variant]},
    media: {nodes: [{id: `gid://shopify/MediaImage/${n}`, image: makeImage()}]},
    images: {nodes: [makeImage()]},
    priceRange: {minVariantPrice: makeMoney()},
    compareAtPriceRange: {minVariantPrice: makeMoney({amount: '0.00'})},
    metafields: [],
    availableForSale: true,
    collections: {nodes: []},
    ...overrides,
  };
};

export const makeSearchaniseProduct = (
  overrides?: Partial<MockSearchaniseProduct>,
): MockSearchaniseProduct => ({
  product_id: '1',
  title: 'Test Product',
  handle: 'test-product',
  link: '/products/test-product',
  image_link: 'https://cdn.shopify.com/s/files/1/test-product.jpg',
  price: '29.99',
  compare_at_price: '0.00',
  vendor: 'Hy-lee',
  product_type: 'Furniture',
  tags: 'test',
  available: true,
  add_to_cart_id: 'gid://shopify/ProductVariant/1',
  ...overrides,
});
