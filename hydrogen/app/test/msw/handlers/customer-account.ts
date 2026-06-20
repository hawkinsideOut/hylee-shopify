import {graphql, HttpResponse} from 'msw';
import {makeCustomer, makeOrder} from '../fixtures';

// Matches both shopify.com/authentication/* and accounts.shopify.com/* patterns
const link = graphql.link(
  /shopify\.com\/(authentication|account)\/.+\/graphql/,
);

const dashboardDataHandler = link.query('DashboardData', () => {
  const customer = makeCustomer();
  return HttpResponse.json({data: {customer}});
});

const accountLayoutCustomerHandler = link.query('AccountLayoutCustomer', () =>
  HttpResponse.json({
    data: {
      customer: {
        id: 'gid://shopify/Customer/1',
        firstName: 'Jane',
        lastName: 'Doe',
        displayName: 'Jane Doe',
        emailAddress: {emailAddress: 'test@example.com'},
      },
    },
  }),
);

const welcomeCustomerIdHandler = link.query('WelcomeCustomerId', () =>
  HttpResponse.json({
    data: {customer: {id: 'gid://shopify/Customer/1', firstName: 'Jane'}},
  }),
);

const customerOrdersHandler = link.query('CustomerOrders', () => {
  const customer = makeCustomer();
  return HttpResponse.json({data: {customer}});
});

const orderDetailHandler = link.query('OrderDetail', () =>
  HttpResponse.json({data: {order: makeOrder()}}),
);

const customerOrderReturnHandler = link.query('CustomerOrderReturn', () =>
  HttpResponse.json({data: {order: makeOrder()}}),
);

const customerSettingsHandler = link.query('CustomerSettings', () =>
  HttpResponse.json({
    data: {
      customer: {
        id: 'gid://shopify/Customer/1',
        firstName: 'Jane',
        lastName: 'Doe',
        emailAddress: {emailAddress: 'test@example.com'},
        phoneNumber: null,
        acceptsMarketing: false,
      },
    },
  }),
);

const addressBookCustomerIdHandler = link.query('AddressBookCustomerId', () =>
  HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

const customerGidForNotificationsHandler = link.query(
  'CustomerGidForNotifications',
  () => HttpResponse.json({data: {customer: {id: 'gid://shopify/Customer/1'}}}),
);

const updateCustomerHandler = link.mutation('UpdateCustomer', () =>
  HttpResponse.json({
    data: {
      customerUpdate: {
        customer: {id: 'gid://shopify/Customer/1'},
        userErrors: [],
      },
    },
  }),
);

export const customerAccountHandlers = [
  dashboardDataHandler,
  accountLayoutCustomerHandler,
  welcomeCustomerIdHandler,
  customerOrdersHandler,
  orderDetailHandler,
  customerOrderReturnHandler,
  customerSettingsHandler,
  addressBookCustomerIdHandler,
  customerGidForNotificationsHandler,
  updateCustomerHandler,
];
