import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    //add nodejs finish event
    //request가 들어온 직 후 미들웨어가 실행되는데 event 등록만하고
    //response finish 이벤트 올때, 로깅하는 미들웨어
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}, ${req.originalUrl}`,
      );
    });
    next();
  }
}
