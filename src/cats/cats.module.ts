import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CatsRespository } from './cat.repository';
import { CatsController } from './cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
  imports: [
    MulterModule.register({
      //multer 저장 폴더
      dest: './upload',
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    //모듈 전달 참조 => 모듈 순환 종속성을 해결
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRespository],
  exports: [CatsService, CatsRespository],
})
export class CatsModule {}
