import type { RequestHandler } from 'express';
type RequestFunc = (...args: Parameters<RequestHandler>) => Promise<void> | void;

export function asyncWrapper(func: RequestFunc): RequestFunc {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.send(error);
    }
  };
}
