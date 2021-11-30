import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipes';
import { CatsService } from './cats.service';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // get hostname:port/cats/
  @Get()
  getAllCat() {
    return { cats: 'all cat' };
  }

  // get hostname:port/cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    return { cats: 'one cat' };
  }

  // post hostname:port/cats/
  @Post()
  createCats() {
    return { cats: 'post cats' };
  }
  // put hostname:port/cats/:id
  @Put(':id')
  updateCat() {
    return { cats: 'put cats' };
  }

  // delete hostname:port/cats/:id
  @Delete(':id')
  deleteCat() {
    return { cats: 'delete cats' };
  }
}
