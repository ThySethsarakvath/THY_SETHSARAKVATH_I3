/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    if (context.getType<'graphql'>() === 'graphql') {
      // GraphQL context
      const gqlCtx = GqlExecutionContext.create(context);
      const info = gqlCtx.getInfo();
      console.log(`[GraphQL] ${info.parentType.name}.${info.fieldName}`);
    } else {
      // HTTP context
      const req = context.switchToHttp().getRequest();
      const { method, url } = req;
      console.log(`[HTTP] ${method} ${url}`);
    }

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        console.log(`Response sent in ${ms}ms`);
      }),
    );
  }
}
