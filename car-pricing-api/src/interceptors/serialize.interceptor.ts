import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  // That means any class can be given
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    console.log("I'm running before the handler");

    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          // this setting ensures that whenever we have an
          // instance of user and try to turn it into plain JSON
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
