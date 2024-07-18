import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(verb: string): string {
    return `Hello World! ${verb}`;
  }
}
