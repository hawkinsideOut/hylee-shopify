import {setupServer} from 'msw/node';
import {handlers} from './handlers';

/**
 * MSW Node server for Vitest unit tests.
 *
 * Lifecycle is managed in app/test/setup.ts.
 *
 * To override a handler for a specific test:
 *
 *   import {server} from '../test/msw/server'
 *   import {graphql, HttpResponse} from 'msw'
 *
 *   test('product not found', async () => {
 *     server.use(
 *       graphql.query('Product', () =>
 *         HttpResponse.json({data: {product: null}})
 *       )
 *     )
 *     // ... rest of test
 *   })
 *
 * Handler overrides added via server.use() are reset after each test
 * by the afterEach(() => server.resetHandlers()) call in setup.ts.
 */
export const server = setupServer(...handlers);
