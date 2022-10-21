import type QueryString from 'qs';

export const createFilter = (params: QueryString.ParsedQs) => {
  const filter: Record<string, string | RegExp> = {};
  const skipKeys = ['perPage, pageParam'];

  Object.keys(params).forEach(key => {
    if (!skipKeys.includes(key)) {
      filter[key] = new RegExp(params[key] as string, 'i');
    }
  });

  return filter;
};
