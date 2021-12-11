import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from '../services/comments.service';
import { CommentsCreateDto } from './dto/comments.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '' })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
