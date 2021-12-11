import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../controllers/dto/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'hello world';
  }

  async createComment(id: string, commets: CommentsCreateDto) {
    return 'hello world';
  }

  async plusLike(id: string) {}
}
