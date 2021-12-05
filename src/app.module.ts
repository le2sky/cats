import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), //.env
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true, // mongodb url 읽을 수 있게 함
      useUnifiedTopology: true, // 최신 mongodb 드라이버 엔진을 사용하도록 설정
    }),
    CatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === `dev` ? true : false;

  configure(consumer: MiddlewareConsumer) {
    // 모든 라우트 요청에 로깅 미들웨어 등록
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', true); //mongoose 쿼리
  }
}
