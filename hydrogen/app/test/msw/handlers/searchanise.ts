import {http, HttpResponse} from 'msw';
import {makeSearchaniseProduct} from '../fixtures';

export const searchaniseHandlers = [
  http.get('https://searchserverapi1.com/getwidgets', ({request}) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') ?? '';
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);

    if (!query) {
      return HttpResponse.json({
        products: [],
        totalCount: 0,
        page: 1,
        pageSize,
        suggestions: [],
      });
    }

    const products = Array.from({length: Math.min(pageSize, 5)}, (_, i) =>
      makeSearchaniseProduct({
        product_id: String(i + 1),
        title: `${query} Result ${i + 1}`,
        handle: `${query.toLowerCase().replace(/\s+/g, '-')}-result-${i + 1}`,
      }),
    );

    return HttpResponse.json({
      products,
      totalCount: 12,
      page: 1,
      pageSize,
      suggestions: [`${query} furniture`, `${query} decor`],
    });
  }),
];
