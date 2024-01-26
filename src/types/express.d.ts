// express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization?: string;
      };
    }
  }
}
