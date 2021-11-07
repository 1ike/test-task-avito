import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const idParamName = 'id';

export const ID = createParamDecorator((data: never, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.params[idParamName];
});
