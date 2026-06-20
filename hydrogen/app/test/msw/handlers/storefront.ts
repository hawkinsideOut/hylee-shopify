import {graphql, HttpResponse} from 'msw';
import {
  makeProduct,
  makeCollection,
  makeStubCollection,
  makeCart,
  makeCustomer,
  makeOrder,
  makeMailingAddress,
} from '../fixtures';

const storefrontDomain =
  process.env.PUBLIC_STORE_DOMAIN ?? 'mock.myshopify.com';
const link = graphql.link(`https://${storefrontDomain}/api/*/graphql.json`);

// ─── Nav / Layout ────────────────────────────────────────────────────────────

const menuItem = (title: string, url: string) => ({
  id: `gid://shopify/MenuItem/${title}`,
  title,
  url: `https://${storefrontDomain}${url}`,
  type: 'COLLECTION',
  items: [],
  resourceId: null,
  tags: [],
});

const shopStub = {
  name: 'Hy-lee',
  description: 'Live Well Anywhere',
  primaryDomain: {url: `https://${storefrontDomain}`},
  paymentSettings: {currencyCode: 'USD'},
  brand: {
    logo: {image: {url: 'https://cdn.shopify.com/s/files/1/logo.png'}},
    squareLogo: null,
    colors: {
      primary: [{background: '#2ac864'}],
      secondary: [{background: '#2699a6'}],
    },
  },
};

const menuStub = {
  id: 'gid://shopify/Menu/1',
  items: [
    menuItem('Categories', '/collections/all'),
    menuItem("What's New", '/collections/whats-new'),
    menuItem('Seasonal', '/collections/seasonal'),
    menuItem('Discounts', '/collections/discounts'),
    menuItem('Promotions & Deals', '/promotions'),
    menuItem('Blog & Media', '/blogs/news'),
  ],
};

const headerHandler = link.query('Header', () =>
  HttpResponse.json({data: {shop: shopStub, menu: menuStub}}),
);

const headerCollectionsHandler = link.query('HeaderCollections', () =>
  HttpResponse.json({
    data: {
      collections: {
        nodes: Array.from({length: 6}, () => makeStubCollection()),
      },
    },
  }),
);

const seasonalNavHandler = link.query('SeasonalNavItems', () =>
  HttpResponse.json({
    data: {
      collection: {
        childCollections: {
          references: {
            nodes: [
              {
                id: 'gid://shopify/Collection/s1',
                title: 'Spring',
                handle: 'spring',
                menuPriority: null,
              },
              {
                id: 'gid://shopify/Collection/s2',
                title: 'Summer',
                handle: 'summer',
                menuPriority: null,
              },
              {
                id: 'gid://shopify/Collection/s3',
                title: 'Fall',
                handle: 'fall',
                menuPriority: null,
              },
            ],
          },
        },
      },
    },
  }),
);

const discountsNavHandler = link.query('DiscountsNavItems', () =>
  HttpResponse.json({
    data: {
      collection: {
        childCollections: {
          references: {
            nodes: [
              {
                id: 'gid://shopify/Collection/d1',
                title: '10% Off',
                handle: 'ten-percent-off',
                menuPriority: null,
              },
              {
                id: 'gid://shopify/Collection/d2',
                title: '20% Off',
                handle: 'twenty-percent-off',
                menuPriority: null,
              },
            ],
          },
        },
      },
    },
  }),
);

const footerHandler = link.query('Footer', () =>
  HttpResponse.json({
    data: {
      menu: {
        id: 'gid://shopify/Menu/footer',
        items: [
          menuItem('About Us', '/about'),
          menuItem('FAQ', '/faq'),
          menuItem('Contact', '/pages/contact'),
          menuItem('Privacy Policy', '/policies/privacy-policy'),
        ],
      },
    },
  }),
);

const globalCmsHandler = link.query('GlobalCms', () =>
  HttpResponse.json({
    data: {
      shop: {
        ...shopStub,
        metafields: [
          {key: 'promo_tier_enabled', value: 'false'},
          {key: 'og_image_url', value: ''},
          {key: 'google_container_id', value: ''},
          {key: 'ga4_measurement_id', value: ''},
          {key: 'ga4_api_secret', value: ''},
          {key: 'shopify_inbox_widget_script_url', value: ''},
          {key: 'shopify_inbox_shop_id', value: ''},
          {key: 'social_media_instagram', value: 'https://instagram.com'},
          {key: 'social_media_facebook', value: 'https://facebook.com'},
          {key: 'social_media_pinterest', value: 'https://pinterest.com'},
        ],
      },
    },
  }),
);

// ─── Products ────────────────────────────────────────────────────────────────

const productHandler = link.query('Product', ({variables}) =>
  HttpResponse.json({
    data: {
      product: makeProduct({
        handle: (variables as any)?.handle ?? 'test-product',
      }),
    },
  }),
);

const productRecommendationsHandler = link.query('ProductRecommendations', () =>
  HttpResponse.json({
    data: {
      productRecommendations: [
        makeProduct(),
        makeProduct(),
        makeProduct(),
        makeProduct(),
      ],
    },
  }),
);

const heroSlidesHandler = link.query('HeroSlides', () =>
  HttpResponse.json({
    data: {
      metaobjects: {
        nodes: [
          {
            id: 'gid://shopify/Metaobject/1',
            fields: [
              {key: 'title', value: 'Live Well Anywhere'},
              {key: 'subtitle', value: 'Furniture for compact living'},
              {key: 'cta_text', value: 'Shop Now'},
              {key: 'cta_url', value: '/collections/all'},
              {
                key: 'image',
                reference: {
                  image: {
                    url: 'https://cdn.shopify.com/s/files/1/hero.jpg',
                    altText: 'Hero',
                    width: 1440,
                    height: 600,
                  },
                },
              },
            ],
          },
        ],
      },
    },
  }),
);

const discountedProductsHandler = link.query('DiscountedProducts', () =>
  HttpResponse.json({
    data: {
      products: {
        nodes: Array.from({length: 4}, () => makeProduct()),
      },
    },
  }),
);

// ─── Collections ─────────────────────────────────────────────────────────────

const collectionHandler = link.query('Collection', ({variables}) =>
  HttpResponse.json({
    data: {
      collection: makeCollection({handle: (variables as any)?.handle ?? 'all'}),
    },
  }),
);

const allCollectionHandler = link.query('AllCollection', ({variables}) =>
  HttpResponse.json({
    data: {
      collection: makeCollection({handle: (variables as any)?.handle ?? 'all'}),
    },
  }),
);

const allCollectionsHandler = link.query('AllCollections', () =>
  HttpResponse.json({
    data: {
      collections: {
        nodes: Array.from({length: 12}, () => makeStubCollection()),
      },
    },
  }),
);

const allProductsFallbackHandler = link.query('AllProductsFallback', () =>
  HttpResponse.json({
    data: {
      products: {
        nodes: Array.from({length: 12}, () => makeProduct()),
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
          startCursor: null,
          endCursor: null,
        },
      },
    },
  }),
);

const compareProductsHandler = link.query('CompareProducts', () =>
  HttpResponse.json({
    data: {
      nodes: [makeProduct(), makeProduct()],
    },
  }),
);

const seasonalCollectionHandler = link.query('SeasonalCollection', () =>
  HttpResponse.json({
    data: {collection: makeCollection({handle: 'seasonal', title: 'Seasonal'})},
  }),
);

// ─── Content Pages ────────────────────────────────────────────────────────────

const pageHandler = link.query('Page', ({variables}) =>
  HttpResponse.json({
    data: {
      page: {
        id: 'gid://shopify/Page/1',
        title: 'Test Page',
        handle: (variables as any)?.handle ?? 'test',
        body: '<p>Page content.</p>',
        bodySummary: 'Page content.',
        seo: {title: 'Test Page', description: 'Page content.'},
      },
    },
  }),
);

const policyStub = (handle: string, title: string) => ({
  id: `gid://shopify/ShopPolicy/${handle}`,
  body: `<p>${title} content.</p>`,
  handle,
  title,
  url: `/policies/${handle}`,
});

const policiesHandler = link.query('Policies', () =>
  HttpResponse.json({
    data: {
      shop: {
        privacyPolicy: policyStub('privacy-policy', 'Privacy Policy'),
        shippingPolicy: policyStub('shipping-policy', 'Shipping Policy'),
        termsOfService: policyStub('terms-of-service', 'Terms of Service'),
        refundPolicy: policyStub('refund-policy', 'Refund Policy'),
      },
    },
  }),
);

const sitemapHandler = link.query('Sitemap', () =>
  HttpResponse.json({
    data: {
      products: {
        nodes: [
          {
            handle: 'test-product',
            updatedAt: '2026-01-01T00:00:00Z',
            onlineStoreUrl: `https://${storefrontDomain}/products/test-product`,
          },
        ],
        pageInfo: {hasNextPage: false, endCursor: null},
      },
      pages: {
        nodes: [
          {
            handle: 'about',
            updatedAt: '2026-01-01T00:00:00Z',
            onlineStoreUrl: `https://${storefrontDomain}/pages/about`,
          },
        ],
        pageInfo: {hasNextPage: false, endCursor: null},
      },
    },
  }),
);

// ─── Customer (Storefront API) ────────────────────────────────────────────────

const rootCustomerIdHandler = link.query('RootCustomerId', () =>
  HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

const customerIdHandler = link.query('CustomerId', () =>
  HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

const customerDetailsHandler = link.query('CustomerDetails', () => {
  const customer = makeCustomer();
  return HttpResponse.json({data: {customer}});
});

const dashboardDataHandler = link.query('DashboardData', () => {
  const customer = makeCustomer();
  return HttpResponse.json({data: {customer}});
});

const customerOrdersHandler = link.query('CustomerOrders', () => {
  const customer = makeCustomer();
  return HttpResponse.json({data: {customer}});
});

const customerOrderDetailHandler = link.query('CustomerOrderDetail', () =>
  HttpResponse.json({
    data: {customer: {order: makeOrder()}},
  }),
);

const customerOrderReturnHandler = link.query('CustomerOrderReturn', () =>
  HttpResponse.json({
    data: {customer: {order: makeOrder()}},
  }),
);

const customerSettingsHandler = link.query('CustomerSettings', () =>
  HttpResponse.json({
    data: {
      customer: {
        id: 'gid://shopify/Customer/1',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@example.com',
        phone: null,
        acceptsMarketing: false,
      },
    },
  }),
);

const shippingCustomerAddressesHandler = link.query(
  'ShippingCustomerAddresses',
  () => {
    const addr = makeMailingAddress();
    return HttpResponse.json({
      data: {
        customer: {
          defaultAddress: {id: addr.id},
          addresses: {nodes: [addr, makeMailingAddress()]},
        },
      },
    });
  },
);

const customerGidHandler = link.query('CustomerGid', () =>
  HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

const customerGidForNotificationsHandler = link.query(
  'CustomerGidForNotifications',
  () => HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

const adminNotificationPrefsHandler = link.query('AdminNotificationPrefs', () =>
  HttpResponse.json({
    data: {
      customer: {
        id: 'gid://shopify/Customer/1',
        acceptsMarketing: false,
      },
    },
  }),
);

const wishlistCustomerIdHandler = link.query('WishlistCustomerId', () =>
  HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

const wishlistProductsHandler = link.query('WishlistProducts', () =>
  HttpResponse.json({
    data: {
      nodes: [makeProduct(), makeProduct()],
    },
  }),
);

const reviewCustomerGidHandler = link.query('ReviewCustomerGid', () =>
  HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

// ─── Mutations ────────────────────────────────────────────────────────────────

const customerAccessTokenCreateHandler = link.mutation(
  'CustomerAccessTokenCreate',
  () =>
    HttpResponse.json({
      data: {
        customerAccessTokenCreate: {
          customerAccessToken: {
            accessToken: 'test-access-token-abc123',
            expiresAt: '2027-01-01T00:00:00Z',
          },
          customerUserErrors: [],
        },
      },
    }),
);

const customerCreateHandler = link.mutation('CustomerCreate', () =>
  HttpResponse.json({
    data: {
      customerCreate: {
        customer: {id: 'gid://shopify/Customer/1'},
        customerUserErrors: [],
      },
    },
  }),
);

const customerRecoverHandler = link.mutation('CustomerRecover', () =>
  HttpResponse.json({
    data: {
      customerRecover: {customerUserErrors: []},
    },
  }),
);

const customerResetHandler = link.mutation('CustomerReset', () =>
  HttpResponse.json({
    data: {
      customerReset: {
        customerAccessToken: {
          accessToken: 'test-reset-token',
          expiresAt: '2027-01-01T00:00:00Z',
        },
        customerUserErrors: [],
      },
    },
  }),
);

const customerActivateHandler = link.mutation('CustomerActivate', () =>
  HttpResponse.json({
    data: {
      customerActivate: {
        customerAccessToken: {
          accessToken: 'test-activate-token',
          expiresAt: '2027-01-01T00:00:00Z',
        },
        customerUserErrors: [],
      },
    },
  }),
);

const customerAccessTokenDeleteHandler = link.mutation(
  'CustomerAccessTokenDelete',
  () =>
    HttpResponse.json({
      data: {
        customerAccessTokenDelete: {
          deletedAccessToken: 'test-access-token-abc123',
          deletedCustomerAccessTokenId: 'gid://shopify/CustomerAccessToken/1',
          userErrors: [],
        },
      },
    }),
);

const customerAddressCreateHandler = link.mutation(
  'CustomerAddressCreate',
  () =>
    HttpResponse.json({
      data: {
        customerAddressCreate: {
          customerAddress: {id: 'gid://shopify/MailingAddress/new'},
          customerUserErrors: [],
        },
      },
    }),
);

const customerAddressUpdateHandler = link.mutation(
  'CustomerAddressUpdate',
  () =>
    HttpResponse.json({
      data: {
        customerAddressUpdate: {
          customerAddress: {id: 'gid://shopify/MailingAddress/1'},
          customerUserErrors: [],
        },
      },
    }),
);

const customerAddressDeleteHandler = link.mutation(
  'CustomerAddressDelete',
  () =>
    HttpResponse.json({
      data: {
        customerAddressDelete: {
          deletedCustomerAddressId: 'gid://shopify/MailingAddress/1',
          customerUserErrors: [],
        },
      },
    }),
);

const customerDefaultAddressUpdateHandler = link.mutation(
  'CustomerDefaultAddressUpdate',
  () =>
    HttpResponse.json({
      data: {
        customerDefaultAddressUpdate: {
          customer: {id: 'gid://shopify/Customer/1'},
          customerUserErrors: [],
        },
      },
    }),
);

const updateCustomerHandler = link.mutation('UpdateCustomer', () =>
  HttpResponse.json({
    data: {
      customerUpdate: {
        customer: {id: 'gid://shopify/Customer/1'},
        customerUserErrors: [],
      },
    },
  }),
);

const cartBuyerIdentityUpdateHandler = link.mutation(
  'CartBuyerIdentityUpdate',
  () =>
    HttpResponse.json({
      data: {cartBuyerIdentityUpdate: {cart: makeCart(), userErrors: []}},
    }),
);

const cartAttributesUpdateHandler = link.mutation('CartAttributesUpdate', () =>
  HttpResponse.json({
    data: {cartAttributesUpdate: {cart: makeCart(), userErrors: []}},
  }),
);

export const storefrontHandlers = [
  // Nav / layout
  headerHandler,
  headerCollectionsHandler,
  seasonalNavHandler,
  discountsNavHandler,
  footerHandler,
  globalCmsHandler,
  // Products
  productHandler,
  productRecommendationsHandler,
  heroSlidesHandler,
  discountedProductsHandler,
  // Collections
  collectionHandler,
  allCollectionHandler,
  allCollectionsHandler,
  allProductsFallbackHandler,
  compareProductsHandler,
  seasonalCollectionHandler,
  // Content
  pageHandler,
  policiesHandler,
  sitemapHandler,
  // Customer (storefront)
  rootCustomerIdHandler,
  customerIdHandler,
  customerDetailsHandler,
  dashboardDataHandler,
  customerOrdersHandler,
  customerOrderDetailHandler,
  customerOrderReturnHandler,
  customerSettingsHandler,
  shippingCustomerAddressesHandler,
  customerGidHandler,
  customerGidForNotificationsHandler,
  adminNotificationPrefsHandler,
  wishlistCustomerIdHandler,
  wishlistProductsHandler,
  reviewCustomerGidHandler,
  // Mutations
  customerAccessTokenCreateHandler,
  customerCreateHandler,
  customerRecoverHandler,
  customerResetHandler,
  customerActivateHandler,
  customerAccessTokenDeleteHandler,
  customerAddressCreateHandler,
  customerAddressUpdateHandler,
  customerAddressDeleteHandler,
  customerDefaultAddressUpdateHandler,
  updateCustomerHandler,
  cartBuyerIdentityUpdateHandler,
  cartAttributesUpdateHandler,
];
