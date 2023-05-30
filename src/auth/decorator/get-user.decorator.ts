/* eslint-disable @typescript-eslint/no-namespace */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
