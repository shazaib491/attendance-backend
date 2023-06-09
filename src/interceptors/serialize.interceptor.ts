import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { Observable, map } from 'rxjs';
  
  interface classConstructor {
    new (...args: any[]): {};
  }
  
  export function Serialize(dto: classConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
  }
  
  export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(
        map((data) => {
          return plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    }
  }
  
  

  