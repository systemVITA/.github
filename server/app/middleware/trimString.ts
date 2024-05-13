import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const exceptions = ['password'];

  const sanitize = (value: any) => {
    if (typeof value === 'string') {
      return value.trim().replace(/^\s+|\s+$/g, '');
    }
    return value;
  };

  const recursiveSanitize = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        recursiveSanitize(obj[key]);
      } else {
        if (!exceptions.includes(key)) {
          obj[key] = sanitize(obj[key]);
        }
      }
    }
  };

  if (req.body) {
    recursiveSanitize(req.body);
  }

  next();
};