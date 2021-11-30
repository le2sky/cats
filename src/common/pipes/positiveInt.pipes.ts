import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('값이 음수입니다.!', 400);
    }
    return value;
  }
}
