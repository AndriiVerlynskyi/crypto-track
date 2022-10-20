import type QueryString from 'qs';

export const createFilter = (params: QueryString.ParsedQs) => {
  const filter = {};
  const skipKeys = ['perPage, pageParam'];

  Object.keys(params).forEach(key => {
    if (!skipKeys.includes(key)) {
      filter[key] = new RegExp(params[key], 'i');
    }
  });

  return filter;
};
