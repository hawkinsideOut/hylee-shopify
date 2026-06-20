import {graphql, http, HttpResponse} from 'msw';

const storefrontDomain =
  process.env.PUBLIC_STORE_DOMAIN ?? 'mock.myshopify.com';

// ─── REST handlers ────────────────────────────────────────────────────────────

const adminTokenHandler = http.post(
  `https://${storefrontDomain}/admin/oauth/access_token`,
  () =>
    HttpResponse.json({
      access_token: 'test-admin-access-token',
      scope: 'read_customers,write_customers,read_products,write_products',
      expires_in: 3600,
    }),
);

const scriptTagsHandler = http.get(
  `https://${storefrontDomain}/admin/api/*/script_tags.json`,
  () => HttpResponse.json({script_tags: []}),
);

const themesHandler = http.get(
  `https://${storefrontDomain}/admin/api/*/themes.json`,
  () =>
    HttpResponse.json({
      themes: [
        {
          id: 123456789,
          name: 'Main Theme',
          role: 'main',
          updated_at: '2026-01-01T00:00:00Z',
        },
      ],
    }),
);

// ─── GraphQL handlers ─────────────────────────────────────────────────────────

const adminLink = graphql.link(
  `https://${storefrontDomain}/admin/api/*/graphql.json`,
);

const customerMetafieldsHandler = adminLink.query('CustomerMetafields', () =>
  HttpResponse.json({
    data: {
      customer: {
        metafields: {
          nodes: [
            {
              id: 'gid://shopify/Metafield/1',
              namespace: 'custom',
              key: 'address_book',
              value: '[]',
            },
            {
              id: 'gid://shopify/Metafield/2',
              namespace: 'custom',
              key: 'survey_completed',
              value: 'false',
            },
          ],
        },
      },
    },
  }),
);

const metafieldsSetHandler = adminLink.mutation(
  'MetafieldsSet',
  ({variables}) =>
    HttpResponse.json({
      data: {
        metafieldsSet: {
          metafields:
            (variables as any)?.metafields?.map((m: any, i: number) => ({
              id: `gid://shopify/Metafield/${i + 1}`,
              namespace: m.namespace,
              key: m.key,
              value: m.value,
            })) ?? [],
          userErrors: [],
        },
      },
    }),
);

const findOrderHandler = adminLink.query('FindOrder', () =>
  HttpResponse.json({
    data: {
      orders: {
        nodes: [
          {
            id: 'gid://shopify/Order/1',
            name: '#1001',
            email: 'test@example.com',
            processedAt: '2026-01-01T00:00:00Z',
            fulfillmentStatus: 'FULFILLED',
            financialStatus: 'PAID',
            currentTotalPrice: {amount: '59.99', currencyCode: 'USD'},
            lineItems: {
              nodes: [
                {
                  title: 'Test Product',
                  quantity: 1,
                  variant: {
                    id: 'gid://shopify/ProductVariant/1',
                    title: 'Default Title',
                    image: null,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  }),
);

export const adminHandlers = [
  adminTokenHandler,
  scriptTagsHandler,
  themesHandler,
  customerMetafieldsHandler,
  metafieldsSetHandler,
  findOrderHandler,
];
