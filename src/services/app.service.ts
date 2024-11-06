import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'A gentle reminder: You are cherished, and the world is brighter because you are here.';
  }
}
