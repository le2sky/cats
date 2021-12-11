import { PickType } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schme';
export class CommentsCreateDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
