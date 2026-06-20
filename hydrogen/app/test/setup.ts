import '@testing-library/jest-dom/vitest';
import {cleanup} from '@testing-library/react';
import {afterAll, afterEach, beforeAll, vi} from 'vitest';
import {server} from './msw/server';

// MSW server lifecycle
beforeAll(() => server.listen({onUnhandledRequest: 'warn'}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock react-router hooks commonly used in components
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({pathname: '/', search: '', hash: ''}),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});
